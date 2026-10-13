import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

class AgendaRulesTest(unittest.TestCase):
    def panels(self, route):
        source = (ROOT / 'src/routes' / route).read_text()
        source = source.replace(r'\u00a0', ' ')
        return re.findall(r'time: "([^"]+)", (?:type: "painel", )?title: "Painel (\d+) [—-] ([^"]+)"', source)

    def test_tax_panel_occupies_previous_panel_five_slot(self):
        for route in ('index.tsx', 'programacao.tsx'):
            with self.subTest(route=route):
                panels = self.panels(route)
                tax = [panel for panel in panels if panel[2].startswith('Inteligência Tributária')]
                self.assertEqual(len(tax), 1)
                self.assertEqual(tax[0][:2], ('14h00', '5'))

    def test_panels_are_renumbered_in_order_after_insertion(self):
        for route in ('index.tsx', 'programacao.tsx'):
            with self.subTest(route=route):
                panels = self.panels(route)
                self.assertEqual([int(panel[1]) for panel in panels], list(range(1, 11)))
                self.assertTrue(panels[5][2].startswith('IA no Digital e Entretenimento'))
                self.assertTrue(panels[9][2].startswith('A IA e o Futuro do Trabalho'))

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
