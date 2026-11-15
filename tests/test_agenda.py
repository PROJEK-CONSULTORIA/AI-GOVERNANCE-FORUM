import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

class AgendaRulesTest(unittest.TestCase):
    def sessions(self, route):
        source = (ROOT / 'src/routes' / route).read_text()
        return re.findall(r'time: "([^"]+)", (?:type: "[^"]+", )?title: "([^"]+)"', source)

    def test_opening_ceremony_at_08h30(self):
        for route in ('edicoes.salvador-2026.tsx', 'programacao.tsx'):
            sessions = self.sessions(route)
            self.assertEqual([time for time, title in sessions if title == 'Cerimônia de Abertura'], ['08h30'])

    def test_magna_time_unchanged(self):
        for route in ('edicoes.salvador-2026.tsx', 'programacao.tsx'):
            sessions = self.sessions(route)
            self.assertEqual([time for time, title in sessions if title.startswith('Palestra Magna')], ['08h50'])

    def test_mongodb_time_after_iso_swap(self):
        for route in ('edicoes.salvador-2026.tsx', 'programacao.tsx'):
            self.assertEqual([time for time, title in self.sessions(route) if title.startswith('Tech Talk MongoDB')], ['14h40'])

    def test_fabio_lecture_shifted_by_ten_minutes(self):
        for route in ('edicoes.salvador-2026.tsx', 'programacao.tsx'):
            self.assertEqual([time for time, title in self.sessions(route) if title.startswith('Palestra: Governança')], ['14h50'])

    def test_tech_talk_order_and_no_overlapping_sessions(self):
        for route in ('edicoes.salvador-2026.tsx', 'programacao.tsx'):
            sessions = self.sessions(route)
            tech_talks = [(time, title.split(' — ')[0]) for time, title in sessions if title.startswith('Tech Talk')]
            self.assertEqual(tech_talks, [('09h50', 'Tech Talk PMI-BA'), ('14h30', 'Tech Talk: Certificação ISO/IEC 42001'), ('14h40', 'Tech Talk MongoDB')])
            self.assertEqual([time for time, title in sessions if title.startswith('Tech Talk PMI-BA')], ['09h50'])
            self.assertEqual([time for time, title in sessions if title.startswith('Tech Talk: Certificação')], ['14h30'])
            minutes = [int(time[:2]) * 60 + int(time[3:]) for time, title in sessions]
            self.assertEqual(minutes, sorted(set(minutes)))
            for i, (_, title) in enumerate(sessions[:-1]):
                minimum = 10 if title.startswith('Tech Talk') else 30 if title.startswith('Painel ') else 0
                self.assertGreaterEqual(minutes[i + 1] - minutes[i], minimum)
        self.assertEqual(self.sessions('edicoes.salvador-2026.tsx'), self.sessions('programacao.tsx'))

    def panels(self, route):
        source = (ROOT / 'src/routes' / route).read_text()
        source = source.replace(r'\u00a0', ' ')
        return re.findall(r'time: "([^"]+)", (?:type: "painel", )?title: "Painel ([^"]+?) [—-] ([^"]+)"', source)

    def test_tax_panel_removed_and_panels_renumbered_in_order(self):
        for route in ('edicoes.salvador-2026.tsx', 'programacao.tsx'):
            with self.subTest(route=route):
                source = (ROOT / 'src/routes' / route).read_text()
                self.assertNotIn('Inteligência Tributária', source)
                panels = self.panels(route)
                self.assertEqual([panel[1] for panel in panels], ['CHIP', 'Solutis', 'Exponencial', 'Tecnoativa', 'Philos', 'Rede +', 'Horus CDA', 'Excellence Consultants'])
                self.assertEqual(panels[4][:2], ('14h00', 'Philos'))
                self.assertTrue(panels[4][2].startswith('A IA e o Futuro do Trabalho'))
                self.assertEqual(panels[7][:2], ('16h20', 'Excellence Consultants'))
                self.assertTrue(panels[7][2].startswith('IA no Digital e Entretenimento'))

    def test_following_panels_shifted_by_ten_minutes(self):
        for route in ('edicoes.salvador-2026.tsx', 'programacao.tsx'):
            panels = self.panels(route)
            self.assertEqual([panel[:2] for panel in panels[5:]], [('15h20', 'Rede +'), ('15h50', 'Horus CDA'), ('16h20', 'Excellence Consultants')])

    def test_event_ends_at_17h20(self):
        for route in ('edicoes.salvador-2026.tsx', 'programacao.tsx'):
            with self.subTest(route=route):
                source = (ROOT / 'src/routes' / route).read_text()
                self.assertRegex(source, r'time: "16h50",[^\n]*Keynote de Encerramento')
                self.assertRegex(source, r'time: "17h20",[^\n]*Encerramento Oficial')

    def test_panel_four_lists_tatyana_souza_and_no_bruno_pereira(self):
        for route in ('edicoes.salvador-2026.tsx', 'programacao.tsx'):
            with self.subTest(route=route):
                source = (ROOT / 'src/routes' / route).read_text()
                panel = [line for line in source.splitlines() if 'Painel Tecnoativa' in line]
                self.assertEqual(len(panel), 1)
                self.assertIn('Tatyana Souza', panel[0])
                self.assertIn('Santa Casa da Bahia', panel[0])
                self.assertNotIn('Bruno Pereira', source)
                self.assertNotIn('UNEB', panel[0])

    def test_closing_keynote_features_jaime_gama(self):
        source = (ROOT / 'src/routes' / 'programacao.tsx').read_text()
        keynote = [line for line in source.splitlines() if 'Keynote de Encerramento' in line]
        self.assertEqual(len(keynote), 1)
        self.assertIn('Jaime Gama', keynote[0])
        self.assertIn('Gartner', keynote[0])

    def test_jaime_gama_listed_as_speaker_on_home_page(self):
        source = (ROOT / 'src/routes' / 'edicoes.salvador-2026.tsx').read_text()
        speakers = source.split('const speakers = [')[1].split('\n];')[0]
        self.assertIn('Jaime Gama', speakers)
        self.assertIn('Ex-Executive Partner do Gartner', speakers)
        self.assertIn('mais de 40 anos de experiência em tecnologia e negócios', speakers)
        self.assertIn('img: jaimeUrl', speakers)

class PanelChangesTest(unittest.TestCase):
    def test_morning_after_10_min_tech_talk(self):
        for r in ('edicoes.salvador-2026.tsx','programacao.tsx'):
            src=(ROOT/'src/routes'/r).read_text()
            for t,title in [('10h00','Painel Solutis'),('10h30','Painel Exponencial'),('11h00','Painel Tecnoativa'),('11h30','Almoço')]:
                self.assertRegex(src, r'time: "%s",[^\n]*title: "%s' % (t,title))

    def test_adilson_moved_to_panel_5_and_marcos_in_panel_1(self):
        for r in ('edicoes.salvador-2026.tsx','programacao.tsx'):
            lines=(ROOT/'src/routes'/r).read_text().splitlines()
            p1=[l for l in lines if 'Painel CHIP ' in l][0]; p5=[l for l in lines if 'Painel Excellence Consultants ' in l][0]
            self.assertNotIn('Adilson Pize',p1); self.assertIn('Marcos Rabelo',p1); self.assertIn('Adilson Pize',p5)

    def test_andre_cavalcante_fully_removed(self):
        for r in ('edicoes.salvador-2026.tsx','programacao.tsx'):
            with self.subTest(route=r):
                self.assertNotIn('Cavalcante', (ROOT/'src/routes'/r).read_text())

    def test_alexandre_darze_fully_removed(self):
        for r in ('edicoes.salvador-2026.tsx','programacao.tsx'):
            with self.subTest(route=r):
                source = (ROOT/'src/routes'/r).read_text()
                self.assertNotIn('Darzé', source)
                self.assertNotIn('darze', source)
                self.assertNotIn('LH Investimentos', source)
                self.assertNotIn('LightHouse', source)
        self.assertFalse((ROOT/'src/assets'/'alexandre-darze.jpg.asset.json').exists())

    def test_fred_soares_moved_to_painel_exponencial(self):
        for r in ('edicoes.salvador-2026.tsx','programacao.tsx'):
            with self.subTest(route=r):
                lines = (ROOT/'src/routes'/r).read_text().splitlines()
                expo = [l for l in lines if 'Painel Exponencial' in l]
                rede = [l for l in lines if 'Painel Rede +' in l]
                self.assertEqual(len(expo), 1)
                self.assertEqual(len(rede), 1)
                self.assertIn('Fred Soares', expo[0])
                self.assertIn('CEO da Exponencial Consultoria', expo[0])
                self.assertNotIn('Fred Soares', rede[0])

    def test_wildson_luz_in_speakers(self):
        src=(ROOT/'src/routes'/'edicoes.salvador-2026.tsx').read_text()
        self.assertIn('name: "Wildson Luz"',src)
        self.assertIn('Senior Enterprise Account Executive na MongoDB',src)
        self.assertIn('wildson-luz.jpg.asset.json',src)
        self.assertIn('mais de 20 anos de experiência em soluções de TI e setor público',src)

    def test_solutis_is_gold(self):
        src = (ROOT / 'src/routes' / 'edicoes.salvador-2026.tsx').read_text()
        gold = src[src.index('title: "Ouro"'):src.index('title: "Prata"')]
        self.assertIn('name: "Solutis"', gold)
        self.assertIn('solutis.jpg.asset.json', src)

    def sponsor_block(self, src, other):
        start = src.index(other)
        nxt = src.find('title: "', start + len(other))
        return src[start:nxt if nxt != -1 else len(src)]

    def test_ag_taxtech_is_silver(self):
        src = (ROOT / 'src/routes' / 'edicoes.salvador-2026.tsx').read_text()
        self.assertIn('name: "AG TaxTech"', self.sponsor_block(src, 'title: "Prata"'))
        self.assertIn('ag-taxtech-white.png.asset.json', src)
        for other in ('title: "Ouro"', 'title: "Bronze"', 'title: "Realização"', 'title: "Apoio"'):
            self.assertNotIn('AG TaxTech', self.sponsor_block(src, other))

    def test_mongodb_is_gold(self):
        src = (ROOT / 'src/routes' / 'edicoes.salvador-2026.tsx').read_text()
        self.assertIn('name: "MongoDB"', self.sponsor_block(src, 'title: "Ouro"'))
        self.assertIn('mongodb-white.png.asset.json', src)
        for other in ('title: "Diamante"', 'title: "Prata"', 'title: "Bronze"', 'title: "Realização"', 'title: "Apoio"'):
            self.assertNotIn('MongoDB', self.sponsor_block(src, other))

    def test_iso_tech_talk_speaker_is_fabio_martins(self):
        for route in ('edicoes.salvador-2026.tsx', 'programacao.tsx'):
            with self.subTest(route=route):
                lines = (ROOT / 'src/routes' / route).read_text().splitlines()
                talk = [l for l in lines if 'Tech Talk: Certificação ISO/IEC 42001' in l]
                self.assertEqual(len(talk), 1)
                self.assertIn('Fábio Martins', talk[0])
                self.assertNotIn('Leandro Pfeifer', talk[0])

    def test_xtrq_is_bronze(self):
        src = (ROOT / 'src/routes' / 'edicoes.salvador-2026.tsx').read_text()
        self.assertIn('name: "XTRQ"', self.sponsor_block(src, 'title: "Bronze"'))
        self.assertIn('xtrq-white.png.asset.json', src)
        for other in ('title: "Diamante"', 'title: "Ouro"', 'title: "Prata"', 'title: "Realização"', 'title: "Apoio"'):
            self.assertNotIn('XTRQ', self.sponsor_block(src, other))

    def test_wildson_luz_is_mongodb_tech_talk_speaker(self):
        for route in ('edicoes.salvador-2026.tsx', 'programacao.tsx'):
            with self.subTest(route=route):
                lines = (ROOT / 'src/routes' / route).read_text().splitlines()
                talk = [l for l in lines if 'Tech Talk MongoDB' in l]
                self.assertEqual(len(talk), 1)
                self.assertIn('Wildson Luz', talk[0])
                self.assertIn('Senior Enterprise Account Executive na MongoDB', talk[0])
                self.assertNotIn('A confirmar', talk[0])

    def test_tatyana_souza_in_speakers(self):
        src=(ROOT/'src/routes'/'edicoes.salvador-2026.tsx').read_text()
        self.assertIn('name: "Tatyana Souza"',src)
        self.assertIn('Gerente de TI da Santa Casa da Bahia',src)
        self.assertIn('tatyana-souza.jpg.asset.json',src)
        self.assertIn('img: tatyanaUrl',src)
        self.assertIn('Diretora de Conteúdo e Desenvolvimento Profissional da SUCESU BA',src)
        self.assertIn('Líder de Segurança da Informação da Bahia 2025 pelo Security Leaders',src)
        self.assertIn('MBA em Liderança, Gestão 4.0 e Inovação (PUCRS)',src)

    def test_vicente_aguiar_in_speakers(self):
        src = (ROOT / 'src/routes' / 'edicoes.salvador-2026.tsx').read_text()
        self.assertIn('name: "Vicente Aguiar"', src)
        self.assertIn('Consultor de Tecnologia e IA do PNUD - Programa das Nações Unidas', src)
        self.assertIn('img: vicenteUrl', src)
        self.assertIn('vicente-aguiar.jpg.asset.json', src)
        self.assertIn('Doutor, Mestre e Bacharel em Administração pela Universidade Federal da Bahia (UFBA)', src)
        self.assertIn('Software Livre, Cultura Hacker e Ecossistema da Colaboração', src)
        self.assertIn('Editora Momento (SP)', src)
        self.assertIn('mais de 20 anos de experiência em projetos de inovação e tecnologia no Brasil, Argentina', src)
        self.assertIn('comunidade de especialistas do IEL-BA', src)
        self.assertIn('Consultor de Tecnologia e IA do PNUD, do IBGE', src)

    def test_vicente_aguiar_in_painel_rede(self):
        for route in ('edicoes.salvador-2026.tsx', 'programacao.tsx'):
            with self.subTest(route=route):
                lines = (ROOT / 'src/routes' / route).read_text().splitlines()
                panel = [l for l in lines if 'Painel Rede +' in l]
                self.assertEqual(len(panel), 1)
                self.assertIn('Vicente Aguiar', panel[0])
                self.assertIn('Consultor de Tecnologia e IA do PNUD', panel[0])
                self.assertIn('Rodrigo Paolilo', panel[0])
                self.assertIn('Gabriel Salgado', panel[0])

    def test_edmilson_puridade_in_speakers(self):
        src = (ROOT / 'src/routes' / 'edicoes.salvador-2026.tsx').read_text()
        self.assertIn('name: "Edmilson Puridade Jr"', src)
        self.assertIn('COO e cofundador da Ekoa', src)
        self.assertIn('img: edmilsonUrl', src)
        self.assertIn('edmilson-puridade.jpg.asset.json', src)
        self.assertIn('edtech de EHS que une tecnologia e educação', src)
        self.assertIn('Engenheiro Ambiental de formação, lidera os times de Produto e Tecnologia', src)

    def test_edmilson_puridade_in_painel_rede(self):
        for route in ('edicoes.salvador-2026.tsx', 'programacao.tsx'):
            with self.subTest(route=route):
                lines = (ROOT / 'src/routes' / route).read_text().splitlines()
                panel = [l for l in lines if 'Painel Rede +' in l]
                self.assertEqual(len(panel), 1)
                self.assertIn('Edmilson Puridade Jr', panel[0])
                self.assertIn('COO e cofundador da Ekoa', panel[0])
                self.assertIn('Vicente Aguiar', panel[0])
                self.assertIn('Rodrigo Paolilo', panel[0])
                self.assertIn('Gabriel Salgado', panel[0])

    def test_exponencial_is_gold_not_bronze(self):
        src = (ROOT / 'src/routes' / 'edicoes.salvador-2026.tsx').read_text()
        self.assertIn('name: "Exponencial"', self.sponsor_block(src, 'title: "Ouro"'))
        self.assertIn('height: "h-48 lg:h-56"', self.sponsor_block(src, 'title: "Ouro"').split('name: "Exponencial"')[1][:200])
        for other in ('title: "Diamante"', 'title: "Prata"', 'title: "Bronze"', 'title: "Realização"', 'title: "Apoio"'):
            self.assertNotIn('Exponencial', self.sponsor_block(src, other))

    def test_grupo_rede_is_gold(self):
        src = (ROOT / 'src/routes' / 'edicoes.salvador-2026.tsx').read_text()
        self.assertIn('name: "Grupo Rede+"', self.sponsor_block(src, 'title: "Ouro"'))
        self.assertIn('grupo-rede-white.png.asset.json', src)
        for other in ('title: "Diamante"', 'title: "Prata"', 'title: "Bronze"', 'title: "Realização"', 'title: "Apoio"'):
            self.assertNotIn('Grupo Rede+', self.sponsor_block(src, other))

    def test_philos_is_gold(self):
        src = (ROOT / 'src/routes' / 'edicoes.salvador-2026.tsx').read_text()
        self.assertIn('name: "Philos"', self.sponsor_block(src, 'title: "Ouro"'))
        self.assertIn('philos-white.png.asset.json', src)
        for other in ('title: "Diamante"', 'title: "Prata"', 'title: "Bronze"', 'title: "Realização"', 'title: "Apoio"'):
            self.assertNotIn('Philos', self.sponsor_block(src, other))

    def test_semantix_is_diamond(self):
        src = (ROOT / 'src/routes' / 'edicoes.salvador-2026.tsx').read_text()
        self.assertIn('name: "Semantix"', self.sponsor_block(src, 'title: "Diamante"'))
        self.assertIn('semantix-white.png.asset.json', src)
        for other in ('title: "Ouro"', 'title: "Prata"', 'title: "Bronze"', 'title: "Realização"', 'title: "Apoio"'):
            self.assertNotIn('Semantix', self.sponsor_block(src, other))

    def test_excellence_is_gold_not_silver(self):
        src = (ROOT / 'src/routes' / 'edicoes.salvador-2026.tsx').read_text()
        gold = src[src.index('title: "Ouro"'):src.index('title: "Prata"')]
        silver = src[src.index('title: "Prata"'):src.index('title: "Bronze"')]
        self.assertIn('Excellence', gold)
        self.assertNotIn('Excellence', silver)

    def test_liliane_bender_in_painel_solutis(self):
        for route in ('edicoes.salvador-2026.tsx', 'programacao.tsx'):
            with self.subTest(route=route):
                lines = (ROOT / 'src/routes' / route).read_text().splitlines()
                panel = [l for l in lines if 'Painel Solutis' in l]
                self.assertEqual(len(panel), 1)
                self.assertIn('Liliane Moura Bender', panel[0])
                self.assertIn('Diretora de Public Sector da Solutis', panel[0])
        idx = (ROOT / 'src/routes' / 'edicoes.salvador-2026.tsx').read_text()
        prog = (ROOT / 'src/routes' / 'programacao.tsx').read_text()
        # foto e descrição agora estão na lista de Palestrantes da página Sobre
        self.assertIn('import lilianeAsset from "@/assets/liliane-bender.jpg.asset.json"', idx)
        self.assertIn('img: lilianeUrl', idx)
        self.assertIn('Bacharel em Ciências da Computação pela UFBA', idx)
        self.assertIn('Diretora de Operações da Vertical Telecom na UNITEC', idx)
        # a agenda não mostra mais a foto nem a descrição dela
        self.assertNotIn('lilianeUrl', prog)
        self.assertNotIn('Bacharel em Ciências da Computação pela UFBA', prog)
        self.assertNotIn('featured', idx)

    def test_manuela_rocha_in_speakers(self):
        src = (ROOT / 'src/routes' / 'edicoes.salvador-2026.tsx').read_text()
        self.assertIn('name: "Manuela Rocha"', src)
        self.assertIn('Gerente de Recursos Humanos da Petrobahia', src)
        self.assertIn('img: manuelaUrl', src)
        self.assertIn('manuela-rocha.jpg.asset.json', src)
        self.assertIn('Há mais de 15 anos atuando na área de Recursos Humanos em empresas nacionais e multinacionais', src)
        self.assertIn('Business Partner com perfil generalista', src)
        self.assertIn('liderança de equipes em excelência operacional', src)

    def test_manuela_rocha_in_painel_philos(self):
        for route in ('edicoes.salvador-2026.tsx', 'programacao.tsx'):
            with self.subTest(route=route):
                lines = (ROOT / 'src/routes' / route).read_text().splitlines()
                panel = [l for l in lines if 'Painel Philos' in l]
                self.assertEqual(len(panel), 1)
                self.assertIn('Manuela Rocha', panel[0])
                self.assertIn('Gerente de Recursos Humanos da Petrobahia', panel[0])
                self.assertIn('Vitor Igdal', panel[0])
                self.assertIn('Carlos Eduardo', panel[0])

class SiteLanguagePastTenseTest(unittest.TestCase):
    """O evento ocorreu em 12/11/2026: o site deve falar no passado."""

    def test_no_future_tense_phrases_remain(self):
        for r in ('edicoes.salvador-2026.tsx', 'programacao.tsx'):
            with self.subTest(route=r):
                src = (ROOT / 'src/routes' / r).read_text()
                for phrase in ('abordará', 'discutirá', 'demonstrará', 'está transformando a gestão',
                               'está redefinindo a inovação', 'está redefinindo a criação',
                               'Programação preliminar', 'sujeita a ajustes', 'Garanta seu lugar',
                               'Vagas limitadas para preservar', 'Pronto para construir'):
                    self.assertNotIn(phrase, src)

    def test_past_tense_phrases_are_present(self):
        idx = (ROOT / 'src/routes' / 'edicoes.salvador-2026.tsx').read_text()
        prog = (ROOT / 'src/routes' / 'programacao.tsx').read_text()
        self.assertIn('O AI Governance Forum 2026 aconteceu em 12 de novembro de 2026', idx)
        self.assertIn('A palestra abordou a importância', idx)
        self.assertIn('O painel discutiu a responsabilização', idx)
        self.assertIn('A palestra demonstrou como organizar', idx)
        self.assertIn('O debate abordou a questão central', idx)
        self.assertIn('Quem conduziu a conversa', idx)
        self.assertIn('Marcas que apoiaram a discussão', idx)
        self.assertIn('Inscrições encerradas', idx)
        self.assertIn('edição realizada', prog)
        self.assertIn('A edição de 12 de novembro de 2026 foi presencial', prog)

    def test_no_ticket_cta_promises_a_seat(self):
        for r in ('edicoes.salvador-2026.tsx', 'programacao.tsx'):
            with self.subTest(route=r):
                src = (ROOT / 'src/routes' / r).read_text()
                for cta in ('Garantir ingresso', 'Garantir meu ingresso', 'Garantir minha vaga'):
                    self.assertNotIn(cta, src)


class InstitutionalPagesTest(unittest.TestCase):
    def test_home_is_about_and_2026_has_an_archive_route(self):
        home = (ROOT / 'src/routes' / 'index.tsx').read_text()
        archive = (ROOT / 'src/routes' / 'edicoes.salvador-2026.tsx').read_text()
        self.assertIn('createFileRoute("/")', home)
        self.assertIn('component: SobrePage', home)
        self.assertIn('createFileRoute("/edicoes/salvador-2026")', archive)

    def test_salvador_2027_route_and_menu_link_exist(self):
        page = (ROOT / 'src/routes' / 'salvador-2027.tsx').read_text()
        header = (ROOT / 'src/components' / 'site-chrome.tsx').read_text()
        self.assertIn('createFileRoute("/salvador-2027")', page)
        self.assertIn('{ to: "/salvador-2027", label: "Salvador 2027"', header)

    def test_previous_editions_menu_targets_salvador_2026(self):
        header = (ROOT / 'src/components' / 'site-chrome.tsx').read_text()
        self.assertIn('{ to: "/edicoes/salvador-2026", label: "Edições Anteriores"', header)


class Salvador2027AnnouncementTest(unittest.TestCase):
    def test_main_menu_has_salvador_2026_button(self):
        header = (ROOT / 'src/components' / 'site-chrome.tsx').read_text()
        self.assertIn('to="/edicoes/salvador-2026"', header)
        self.assertIn('AI Governance Forum Salvador 2026', header)

    def test_save_the_date_banner_has_both_official_dates(self):
        home = (ROOT / 'src/routes' / 'index.tsx').read_text()
        header = (ROOT / 'src/components' / 'site-chrome.tsx').read_text()
        self.assertIn('<SaveTheDateBanner />', home)
        self.assertIn('Save the Date', header)
        self.assertIn('23 e 24 de setembro de 2027', header)

    def test_save_the_date_banner_is_complete(self):
        header = (ROOT / 'src/components' / 'site-chrome.tsx').read_text()
        parts = (
            '<span>AI Governance Forum</span>',
            '<span>Save the Date</span>',
            '<span>23 e 24 de setembro de 2027</span>',
        )
        for part in parts:
            self.assertIn(part, header)
        positions = [header.index(part) for part in parts]
        self.assertEqual(positions, sorted(positions))

    def test_official_slogan_is_used_in_home_and_footer(self):
        home = (ROOT / 'src/routes' / 'index.tsx').read_text()
        footer = (ROOT / 'src/components' / 'site-chrome.tsx').read_text()
        self.assertIn('O Futuro da IA começa pela ', home)
        self.assertIn('Governança.</span>', home)
        self.assertIn('O Futuro da IA começa pela Governança.', footer)
        self.assertNotIn('Governando o futuro da Inteligência Artificial', footer)

    def test_countdown_targets_opening_day_and_shows_requested_units(self):
        countdown = (ROOT / 'src/lib' / 'countdown.ts').read_text()
        component = (ROOT / 'src/components' / 'countdown-2027.tsx').read_text()
        self.assertIn('2027-09-23T00:00:00-03:00', countdown)
        for unit in ('dias', 'horas', 'minutos', 'segundos'):
            self.assertIn(f'label: "{unit}"', component)


if __name__ == '__main__':
    unittest.main()
