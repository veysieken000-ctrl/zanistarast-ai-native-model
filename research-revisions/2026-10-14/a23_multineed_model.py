"""A23 multi-good max-min basic-needs model, with independent LP verification."""
from fractions import Fraction
from itertools import product

def guarantee(demand, stock, ecological_caps=None):
    if not demand or not stock or any(len(row) != len(stock) for row in demand):
        raise ValueError("shape mismatch")
    if any(v <= 0 for row in demand for v in row):
        raise ValueError("demands must be positive")
    if any(s < 0 for s in stock):
        raise ValueError("stock must be nonnegative")
    if ecological_caps is not None:
        if len(ecological_caps) != len(stock) or any(v < 0 for v in ecological_caps):
            raise ValueError("invalid ecological cap")
        stock = [min(s, c) for s, c in zip(stock, ecological_caps)]
    totals = [sum(row[k] for row in demand) for k in range(len(stock))]
    return min([Fraction(1)] + [Fraction(s, total) for s, total in zip(stock, totals)])

def equal_ratio_allocation(demand, stock, ecological_caps=None):
    g = guarantee(demand, stock, ecological_caps)
    return [[g * v for v in row] for row in demand]

def pooled_baseline(demand, stock):
    return min(Fraction(1), Fraction(sum(stock), sum(map(sum, demand))))

def independent_lp(demand, stock):
    from scipy.optimize import linprog
    n, k = len(demand), len(stock)
    objective = [0.] * (n*k) + [-1.]
    A, b = [], []
    for j in range(k):
        row = [0.] * (n*k+1)
        for i in range(n): row[i*k+j] = 1.
        A.append(row); b.append(float(stock[j]))
    for i in range(n):
        for j in range(k):
            row = [0.] * (n*k+1)
            row[i*k+j] = -1.
            row[-1] = float(demand[i][j])
            A.append(row); b.append(0.)
    bounds = [(0., float(demand[i][j])) for i in range(n) for j in range(k)] + [(0., 1.)]
    sol = linprog(objective, A_ub=A, b_ub=b, bounds=bounds, method="highs")
    if not sol.success: raise AssertionError(sol.message)
    return sol.x[-1]

if __name__ == "__main__":
    from unittest import TestCase, main
    class Tests(TestCase):
        def test_zero_critical_good(self):
            d = [[2,2,2], [2,2,2]]
            self.assertEqual(guarantee(d, [4,0,4]), 0)
            self.assertEqual(pooled_baseline(d, [4,0,4]), Fraction(2,3))
        def test_eco_cap(self):
            d = [[2,2,2], [2,2,2]]
            self.assertEqual(guarantee(d, [4,4,4], [3,4,4]), Fraction(3,4))
        def test_allocation_feasible(self):
            d = [[1,2,3], [2,1,1]]; stock = [2,2,3]
            x = equal_ratio_allocation(d, stock)
            for j, s in enumerate(stock):
                self.assertLessEqual(sum(row[j] for row in x), s)
            for i in range(2):
                for j in range(3):
                    self.assertLessEqual(x[i][j], d[i][j])
        def test_input_validation(self):
            for d, s, cap in [([], [1], None), ([[0]], [1], None), ([[1,2]], [1], None), ([[1]], [-1], None), ([[1]], [1], [-1])]:
                with self.assertRaises(ValueError): guarantee(d, s, cap)
        def test_exhaustive_lp_crosscheck(self):
            checks = 0
            for dvals in product((1,2), repeat=6):
                demand = [dvals[:3], dvals[3:]]
                for stock in product(range(3), repeat=3):
                    self.assertAlmostEqual(float(guarantee(demand, stock)), independent_lp(demand, stock), places=8)
                    checks += 1
            self.assertEqual(checks, 1728)
            print(f"INDEPENDENT_LP_CROSSCHECKS={checks}")
    main(verbosity=2)
