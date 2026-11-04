import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

class AgendaRulesTest(unittest.TestCase):
    def sessions(self, route):
        source = (ROOT / 'src/routes' / route).read_text()
        return re.findall(r'time: "([^"]+)", (?:type: "[^"]+", )?title: "([^"]+)"', source)

    def test_opening_ceremony_at_08h30(self):
        for route in ('index.tsx', 'programacao.tsx'):
            sessions = self.sessions(route)
            self.assertEqual([time for time, title in sessions if title == 'Cerimônia de Abertura'], ['08h30'])

    def test_magna_time_unchanged(self):
        for route in ('index.tsx', 'programacao.tsx'):
            sessions = self.sessions(route)
            self.assertEqual([time for time, title in sessions if title.startswith('Palestra Magna')], ['08h50'])

    def test_mongodb_time_after_iso_swap(self):
        for route in ('index.tsx', 'programacao.tsx'):
            self.assertEqual([time for time, title in self.sessions(route) if title.startswith('Tech Talk MongoDB')], ['14h40'])

    def test_fabio_lecture_shifted_by_ten_minutes(self):
        for route in ('index.tsx', 'programacao.tsx'):
            self.assertEqual([time for time, title in self.sessions(route) if title.startswith('Palestra: Governança')], ['14h50'])

    def test_tech_talk_order_and_no_overlapping_sessions(self):
        for route in ('index.tsx', 'programacao.tsx'):
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
        self.assertEqual(self.sessions('index.tsx'), self.sessions('programacao.tsx'))

    def panels(self, route):
        source = (ROOT / 'src/routes' / route).read_text()
        source = source.replace(r'\u00a0', ' ')
        return re.findall(r'time: "([^"]+)", (?:type: "painel", )?title: "Painel ([^"]+?) [—-] ([^"]+)"', source)

    def test_tax_panel_removed_and_panels_renumbered_in_order(self):
        for route in ('index.tsx', 'programacao.tsx'):
            with self.subTest(route=route):
                source = (ROOT / 'src/routes' / route).read_text()
                self.assertNotIn('Inteligência Tributária', source)
                panels = self.panels(route)
                self.assertEqual([panel[1] for panel in panels], ['CHIP', 'Solutis', '3', 'Tecnoativa', '8', 'Rede +', 'Horus CDA', 'Excellence Consultants'])
                self.assertEqual(panels[4][:2], ('14h00', '8'))
                self.assertTrue(panels[4][2].startswith('A IA e o Futuro do Trabalho'))
                self.assertEqual(panels[7][:2], ('16h20', 'Excellence Consultants'))
                self.assertTrue(panels[7][2].startswith('IA no Digital e Entretenimento'))

    def test_following_panels_shifted_by_ten_minutes(self):
        for route in ('index.tsx', 'programacao.tsx'):
            panels = self.panels(route)
            self.assertEqual([panel[:2] for panel in panels[5:]], [('15h20', 'Rede +'), ('15h50', 'Horus CDA'), ('16h20', 'Excellence Consultants')])

    def test_event_ends_at_17h20(self):
        for route in ('index.tsx', 'programacao.tsx'):
            with self.subTest(route=route):
                source = (ROOT / 'src/routes' / route).read_text()
                self.assertRegex(source, r'time: "16h50",[^\n]*Keynote de Encerramento')
                self.assertRegex(source, r'time: "17h20",[^\n]*Encerramento Oficial')

    def test_panel_four_lists_tatyana_souza_and_no_bruno_pereira(self):
        for route in ('index.tsx', 'programacao.tsx'):
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
        source = (ROOT / 'src/routes' / 'index.tsx').read_text()
        speakers = source.split('const speakers = [')[1].split('\n];')[0]
        self.assertIn('Jaime Gama', speakers)
        self.assertIn('Ex-Executive Partner do Gartner', speakers)
        self.assertIn('mais de 40 anos de experiência em tecnologia e negócios', speakers)
        self.assertIn('img: jaimeUrl', speakers)

class PanelChangesTest(unittest.TestCase):
    def test_morning_after_10_min_tech_talk(self):
        for r in ('index.tsx','programacao.tsx'):
            src=(ROOT/'src/routes'/r).read_text()
            for t,title in [('10h00','Painel Solutis'),('10h30','Painel 3'),('11h00','Painel Tecnoativa'),('11h30','Almoço')]:
                self.assertRegex(src, r'time: "%s",[^\n]*title: "%s' % (t,title))

    def test_adilson_moved_to_panel_5_and_marcos_in_panel_1(self):
        for r in ('index.tsx','programacao.tsx'):
            lines=(ROOT/'src/routes'/r).read_text().splitlines()
            p1=[l for l in lines if 'Painel CHIP ' in l][0]; p5=[l for l in lines if 'Painel Excellence Consultants ' in l][0]
            self.assertNotIn('Adilson Pize',p1); self.assertIn('Marcos Rabelo',p1); self.assertIn('Adilson Pize',p5)

    def test_andre_cavalcante_fully_removed(self):
        for r in ('index.tsx','programacao.tsx'):
            with self.subTest(route=r):
                self.assertNotIn('Cavalcante', (ROOT/'src/routes'/r).read_text())

    def test_alexandre_darze_fully_removed(self):
        for r in ('index.tsx','programacao.tsx'):
            with self.subTest(route=r):
                source = (ROOT/'src/routes'/r).read_text()
                self.assertNotIn('Darzé', source)
                self.assertNotIn('darze', source)
                self.assertNotIn('LH Investimentos', source)
                self.assertNotIn('LightHouse', source)
        self.assertFalse((ROOT/'src/assets'/'alexandre-darze.jpg.asset.json').exists())

    def test_wildson_luz_in_speakers(self):
        src=(ROOT/'src/routes'/'index.tsx').read_text()
        self.assertIn('name: "Wildson Luz"',src)
        self.assertIn('Senior Enterprise Account Executive na MongoDB',src)
        self.assertIn('wildson-luz.jpg.asset.json',src)
        self.assertIn('mais de 20 anos de experiência em soluções de TI e setor público',src)

    def test_solutis_is_gold(self):
        src = (ROOT / 'src/routes' / 'index.tsx').read_text()
        gold = src[src.index('title: "Ouro"'):src.index('title: "Prata"')]
        self.assertIn('name: "Solutis"', gold)
        self.assertIn('solutis.jpg.asset.json', src)

    def sponsor_block(self, src, other):
        start = src.index(other)
        nxt = src.find('title: "', start + len(other))
        return src[start:nxt if nxt != -1 else len(src)]

    def test_ag_taxtech_is_silver(self):
        src = (ROOT / 'src/routes' / 'index.tsx').read_text()
        self.assertIn('name: "AG TaxTech"', self.sponsor_block(src, 'title: "Prata"'))
        self.assertIn('ag-taxtech-white.png.asset.json', src)
        for other in ('title: "Ouro"', 'title: "Bronze"', 'title: "Realização"', 'title: "Apoio"'):
            self.assertNotIn('AG TaxTech', self.sponsor_block(src, other))

    def test_mongodb_is_gold(self):
        src = (ROOT / 'src/routes' / 'index.tsx').read_text()
        self.assertIn('name: "MongoDB"', self.sponsor_block(src, 'title: "Ouro"'))
        self.assertIn('mongodb-white.png.asset.json', src)
        for other in ('title: "Diamante"', 'title: "Prata"', 'title: "Bronze"', 'title: "Realização"', 'title: "Apoio"'):
            self.assertNotIn('MongoDB', self.sponsor_block(src, other))

    def test_iso_tech_talk_speaker_is_fabio_martins(self):
        for route in ('index.tsx', 'programacao.tsx'):
            with self.subTest(route=route):
                lines = (ROOT / 'src/routes' / route).read_text().splitlines()
                talk = [l for l in lines if 'Tech Talk: Certificação ISO/IEC 42001' in l]
                self.assertEqual(len(talk), 1)
                self.assertIn('Fábio Martins', talk[0])
                self.assertNotIn('Leandro Pfeifer', talk[0])

    def test_xtrq_is_bronze(self):
        src = (ROOT / 'src/routes' / 'index.tsx').read_text()
        self.assertIn('name: "XTRQ"', self.sponsor_block(src, 'title: "Bronze"'))
        self.assertIn('xtrq-white.png.asset.json', src)
        for other in ('title: "Diamante"', 'title: "Ouro"', 'title: "Prata"', 'title: "Realização"', 'title: "Apoio"'):
            self.assertNotIn('XTRQ', self.sponsor_block(src, other))

    def test_wildson_luz_is_mongodb_tech_talk_speaker(self):
        for route in ('index.tsx', 'programacao.tsx'):
            with self.subTest(route=route):
                lines = (ROOT / 'src/routes' / route).read_text().splitlines()
                talk = [l for l in lines if 'Tech Talk MongoDB' in l]
                self.assertEqual(len(talk), 1)
                self.assertIn('Wildson Luz', talk[0])
                self.assertIn('Senior Enterprise Account Executive na MongoDB', talk[0])
                self.assertNotIn('A confirmar', talk[0])

    def test_tatyana_souza_in_speakers(self):
        src=(ROOT/'src/routes'/'index.tsx').read_text()
        self.assertIn('name: "Tatyana Souza"',src)
        self.assertIn('Gerente de TI da Santa Casa da Bahia',src)
        self.assertIn('tatyana-souza.jpg.asset.json',src)
        self.assertIn('img: tatyanaUrl',src)
        self.assertIn('Diretora de Conteúdo e Desenvolvimento Profissional da SUCESU BA',src)
        self.assertIn('Líder de Segurança da Informação da Bahia 2025 pelo Security Leaders',src)
        self.assertIn('MBA em Liderança, Gestão 4.0 e Inovação (PUCRS)',src)

    def test_semantix_is_diamond(self):
        src = (ROOT / 'src/routes' / 'index.tsx').read_text()
        self.assertIn('name: "Semantix"', self.sponsor_block(src, 'title: "Diamante"'))
        self.assertIn('semantix-white.png.asset.json', src)
        for other in ('title: "Ouro"', 'title: "Prata"', 'title: "Bronze"', 'title: "Realização"', 'title: "Apoio"'):
            self.assertNotIn('Semantix', self.sponsor_block(src, other))

    def test_excellence_is_gold_not_silver(self):
        src = (ROOT / 'src/routes' / 'index.tsx').read_text()
        gold = src[src.index('title: "Ouro"'):src.index('title: "Prata"')]
        silver = src[src.index('title: "Prata"'):src.index('title: "Bronze"')]
        self.assertIn('Excellence', gold)
        self.assertNotIn('Excellence', silver)

    def test_liliane_bender_in_painel_solutis(self):
        for route in ('index.tsx', 'programacao.tsx'):
            with self.subTest(route=route):
                lines = (ROOT / 'src/routes' / route).read_text().splitlines()
                panel = [l for l in lines if 'Painel Solutis' in l]
                self.assertEqual(len(panel), 1)
                self.assertIn('Liliane Moura Bender', panel[0])
                self.assertIn('Diretora de Public Sector da Solutis', panel[0])
        idx = (ROOT / 'src/routes' / 'index.tsx').read_text()
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

if __name__ == '__main__':
    unittest.main()
