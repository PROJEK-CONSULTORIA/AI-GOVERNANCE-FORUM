import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

class AgendaRulesTest(unittest.TestCase):
    def panels(self, route):
        source = (ROOT / 'src/routes' / route).read_text()
        return re.findall(r'time: "([^"]+)", (?:type: "painel", )?title: "Painel (\d+) [—-] (?:\\u00a0)?([^"]+)"', source)

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

if __name__ == '__main__':
    unittest.main()
