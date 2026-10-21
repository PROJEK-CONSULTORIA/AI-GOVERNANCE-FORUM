import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

class AgendaRulesTest(unittest.TestCase):
    def sessions(self, route):
        source = (ROOT / 'src/routes' / route).read_text()
        return re.findall(r'time: "([^"]+)", (?:type: "[^"]+", )?title: "([^"]+)"', source)

    def test_opening_times_unchanged(self):
        for route in ('index.tsx', 'programacao.tsx'):
            sessions = self.sessions(route)
            self.assertEqual([time for time, title in sessions if title == 'Cerimônia de Abertura'], ['09h00'])
            self.assertEqual([time for time, title in sessions if title.startswith('Palestra Magna')], ['09h20'])

    def test_mongodb_time_unchanged(self):
        for route in ('index.tsx', 'programacao.tsx'):
            self.assertEqual([time for time, title in self.sessions(route) if title.startswith('Tech Talk MongoDB')], ['14h30'])

    def test_fabio_lecture_shifted_by_ten_minutes(self):
        for route in ('index.tsx', 'programacao.tsx'):
            self.assertEqual([time for time, title in self.sessions(route) if title.startswith('Palestra: Governança')], ['15h10'])

    def test_tech_talks_interleaved_with_panels(self):
        for route in ('index.tsx', 'programacao.tsx'):
            sessions = self.sessions(route)
            for i, (time, title) in enumerate(sessions):
                if title.startswith('Tech Talk'):
                    self.assertFalse(sessions[i - 1][1].startswith('Tech Talk'))
                    self.assertFalse(sessions[i + 1][1].startswith('Tech Talk'))
            self.assertEqual([time for time, title in sessions if title.startswith('Tech Talk PMI-BA')], ['10h30'])
            self.assertEqual([time for time, title in sessions if title.startswith('Tech Talk: Certificação')], ['15h00'])
            minutes = [int(time[:2]) * 60 + int(time[3:]) for time, title in sessions]
            self.assertEqual(minutes, sorted(set(minutes)))
            for i, (_, title) in enumerate(sessions[:-1]):
                minimum = 10 if title.startswith('Tech Talk') else 30 if title.startswith('Painel ') else 0
                self.assertGreaterEqual(minutes[i + 1] - minutes[i], minimum)
        self.assertEqual(self.sessions('index.tsx'), self.sessions('programacao.tsx'))

    def panels(self, route):
        source = (ROOT / 'src/routes' / route).read_text()
        source = source.replace(r'\u00a0', ' ')
        return re.findall(r'time: "([^"]+)", (?:type: "painel", )?title: "Painel (\d+) [—-] ([^"]+)"', source)

    def test_tax_panel_removed_and_panels_renumbered_in_order(self):
        for route in ('index.tsx', 'programacao.tsx'):
            with self.subTest(route=route):
                source = (ROOT / 'src/routes' / route).read_text()
                self.assertNotIn('Inteligência Tributária', source)
                panels = self.panels(route)
                self.assertEqual([int(panel[1]) for panel in panels], list(range(1, 9)))
                self.assertEqual(panels[4][:2], ('14h00', '5'))
                self.assertTrue(panels[4][2].startswith('IA no Digital e Entretenimento'))
                self.assertEqual(panels[7][:2], ('16h30', '8'))
                self.assertTrue(panels[7][2].startswith('A IA e o Futuro do Trabalho'))

    def test_following_panels_shifted_by_ten_minutes(self):
        for route in ('index.tsx', 'programacao.tsx'):
            panels = self.panels(route)
            self.assertEqual([panel[:2] for panel in panels[5:]], [('15h30', '6'), ('16h00', '7'), ('16h30', '8')])

    def test_event_ends_at_17h40(self):
        for route in ('index.tsx', 'programacao.tsx'):
            with self.subTest(route=route):
                source = (ROOT / 'src/routes' / route).read_text()
                self.assertRegex(source, r'time: "17h00",[^\n]*Keynote de Encerramento')
                self.assertRegex(source, r'time: "17h40",[^\n]*Encerramento Oficial')

    def test_panel_four_lists_tatyana_souza_and_no_bruno_pereira(self):
        for route in ('index.tsx', 'programacao.tsx'):
            with self.subTest(route=route):
                source = (ROOT / 'src/routes' / route).read_text()
                panel = [line for line in source.splitlines() if 'Painel 4' in line]
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

if __name__ == '__main__':
    unittest.main()
