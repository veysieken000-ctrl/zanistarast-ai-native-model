"""A25: exact cut-based max-min guarantee for bipartite supply-access networks.

Pure standard library, deterministic. Research illustration, not a life-rights oracle.
Run: python3 a25_expansion_guard.py
"""
from fractions import Fraction
from itertools import product
import unittest


def guarantee(demand, supply, access):
    """Exact g* for fractional divisible single-good flows, no intermediate nodes.

    demand[i] positive, supply[s] nonnegative, access[s][i] nonnegative.
    Edge capacity and source capacity are separate. 0 <= g <= 1.
    """
    n, m = len(demand), len(supply)
    if not n or not m or any(x <= 0 for x in demand):
        raise ValueError('Need nonempty positive demands and at least one depot')
    if any(x < 0 for x in supply) or len(access) != m or any(len(row) != n or any(x < 0 for x in row) for row in access):
        raise ValueError('Invalid capacities or dimensions')
    best = Fraction(1)
    for hmask in range(1, 1 << n):
        h = [i for i in range(n) if hmask & (1 << i)]
        dh = sum(demand[i] for i in h)
        for amask in range(1 << m):
            cap = sum(supply[s] for s in range(m) if not (amask & (1 << s)))
            cap += sum(access[s][i] for s in range(m) if amask & (1 << s) for i in h)
            best = min(best, Fraction(cap, dh))
    return best


def one_more_edge(access, s, i, delta=1):
    arr = [list(row) for row in access]
    arr[s][i] += delta
    return arr


class A25Tests(unittest.TestCase):
    def test_no_bottleneck(self):
        self.assertEqual(guarantee([2, 2], [4], [[2, 2]]), 1)

    def test_a24_counterexample(self):
        self.assertEqual(guarantee([2, 2], [2, 2], [[2, 0], [2, 1]]), Fraction(1, 2))

    def test_population_expansion_can_lower_minimum(self):
        old = guarantee([4], [4], [[4]])
        new = guarantee([4, 4], [4], [[4, 4]])
        self.assertEqual((old, new), (1, Fraction(1, 2)))
        self.assertEqual(guarantee([4, 4], [8], [[4, 4]]), 1)
        self.assertEqual(guarantee([4, 4], [8], [[4, 2]]), Fraction(1, 2))

    def test_zero_access(self):
        self.assertEqual(guarantee([1, 1], [10], [[1, 0]]), 0)

    def test_input_validation(self):
        for args in [([], [1], [[]]), ([0], [1], [[1]]), ([1], [-1], [[1]]), ([1], [1], [[-1]]), ([1], [1], [[]])]:
            with self.assertRaises(ValueError):
                guarantee(*args)

    def test_independent_linprog_400(self):
        """Cross-check cut enumeration against independent HiGHS LP on seeded cases."""
        import random
        try:
            from scipy.optimize import linprog
        except ImportError:
            self.skipTest('SciPy absent: independent LP cross-check not run')
        rng = random.Random(251014)
        for _ in range(400):
            m, n = rng.randint(1, 3), rng.randint(1, 3)
            d = [rng.randint(1, 4) for _ in range(n)]
            c = [rng.randint(0, 6) for _ in range(m)]
            u = [[rng.randint(0, 5) for _ in range(n)] for _ in range(m)]
            size = m * n + 1
            objective = [0.0] * (size - 1) + [-1.0]
            a, b = [], []
            for depot in range(m):
                row = [0.0] * size
                for i in range(n):
                    row[depot * n + i] = 1.0
                a.append(row)
                b.append(c[depot])
            for i in range(n):
                row = [0.0] * size
                for depot in range(m):
                    row[depot * n + i] = -1.0
                row[-1] = float(d[i])
                a.append(row)
                b.append(0.0)
            bounds = [(0.0, float(u[depot][i])) for depot in range(m) for i in range(n)] + [(0.0, 1.0)]
            result = linprog(objective, A_ub=a, b_ub=b, bounds=bounds, method='highs')
            self.assertTrue(result.success, result.message)
            self.assertAlmostEqual(float(guarantee(d, c, u)), result.x[-1], places=8)

    def test_exhaustive_monotonicity_2916(self):
        cases = 0
        for d in product((1, 2), repeat=2):
            for c in product((0, 1, 2), repeat=2):
                for e in product((0, 1, 2), repeat=4):
                    u = [e[:2], e[2:]]
                    base = guarantee(d, c, u)
                    for s in range(2):
                        cp = list(c)
                        cp[s] += 1
                        self.assertGreaterEqual(guarantee(d, cp, u), base)
                        for i in range(2):
                            self.assertGreaterEqual(guarantee(d, c, one_more_edge(u, s, i)), base)
                    self.assertLessEqual(guarantee((d[0] + 1, d[1]), c, u), base)
                    cases += 1
        self.assertEqual(cases, 2916)


if __name__ == '__main__':
    unittest.main(verbosity=2)
