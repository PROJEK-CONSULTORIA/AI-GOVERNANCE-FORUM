import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

class AgendaRulesTest(unittest.TestCase):
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
                self.assertEqual(panels[7][:2], ('16h20', '8'))
                self.assertTrue(panels[7][2].startswith('A IA e o Futuro do Trabalho'))

    def test_event_ends_at_17h30(self):
        for route in ('index.tsx', 'programacao.tsx'):
            with self.subTest(route=route):
                source = (ROOT / 'src/routes' / route).read_text()
                self.assertRegex(source, r'time: "16h50",[^\n]*Keynote de Encerramento')
                self.assertRegex(source, r'time: "17h30",[^\n]*Encerramento Oficial')
                self.assertNotIn('17h10', source)

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
