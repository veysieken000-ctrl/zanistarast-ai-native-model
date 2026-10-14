"""A18: Ortak-kaynak hatasi ve coklu olumlu raporlar; sentetik tam olasilik testi.
Calistir: python3 -m unittest -v test_akil_bilgi_ortak_hata_a18.py
Python >= 3.9; yalniz standart kutuphane; dis API/veri yok.
"""
import unittest
from fractions import Fraction as F
from itertools import product

S, FP = F(4, 5), F(1, 5)


def all_positive(n, q, rho):
    """P(n pozitif | durum), gizli ortak-kopya rejimi olasiligi rho."""
    assert n >= 1 and 0 <= q <= 1 and 0 <= rho <= 1
    return rho * q + (1 - rho) * q**n


def vector_probability(bits, q, rho):
    """Gizli rejim: rho ile tum raporlar tek Bernoulli kopyasi; aksi halde iid."""
    n, k = len(bits), sum(bits)
    assert n >= 1 and 0 <= q <= 1 and 0 <= rho <= 1
    independent = q**k * (1-q)**(n-k)
    copied = q if k == n else (1-q if k == 0 else F(0))
    return rho * copied + (1-rho) * independent


def posterior(n, rho, prior=F(1, 2), s=S, f=FP):
    a, b = all_positive(n, s, rho), all_positive(n, f, rho)
    denom = prior*a + (1-prior)*b
    assert denom > 0
    return prior*a/denom


def rho_threshold(n, tau=F(9, 10), prior=F(1, 2)):
    """P(H | n pozitif) >= tau icin en buyuk rho, ornek parametrelerde."""
    assert n >= 2 and 0 < tau < 1 and 0 < prior < 1
    odds = tau*(1-prior)/((1-tau)*prior)
    a0, b0 = S**n, FP**n
    denominator = odds*(FP-b0) - (S-a0)
    assert denominator > 0
    return (a0-odds*b0)/denominator


class CommonErrorEvidenceTests(unittest.TestCase):
    def test_joint_distribution_normalizes(self):
        for n in range(1, 9):
            for rho in [F(i, 10) for i in range(11)]:
                for q in (S, FP):
                    total = sum(vector_probability(bits, q, rho)
                                for bits in product((0, 1), repeat=n))
                    self.assertEqual(total, 1)

    def test_exact_joint_matches_formula(self):
        for n in range(1, 9):
            for rho in [F(i, 10) for i in range(11)]:
                for q in (S, FP):
                    self.assertEqual(vector_probability((1,)*n, q, rho),
                                     all_positive(n, q, rho))

    def test_conditional_marginals_and_correlation(self):
        for rho in [F(i, 10) for i in range(11)]:
            for q in (S, FP):
                joint11 = vector_probability((1, 1), q, rho)
                self.assertEqual(joint11, rho*q+(1-rho)*q*q)
                self.assertEqual((joint11-q*q)/(q*(1-q)), rho)

    def test_baselines(self):
        self.assertEqual(posterior(1, F(0)), F(4, 5))
        self.assertEqual(posterior(5, F(0)), F(1024, 1025))
        self.assertEqual(posterior(5, F(1)), F(4, 5))
        self.assertEqual(posterior(5, F(1, 2)), F(1762, 2075))

    def test_nonmonotone_unanimity(self):
        self.assertEqual(posterior(3, F(1, 2)), F(82, 95))
        self.assertEqual(posterior(4, F(1, 2)), F(6, 7))
        self.assertGreater(posterior(3, F(1, 2)), posterior(4, F(1, 2)))
        self.assertGreater(posterior(4, F(1, 2)), posterior(5, F(1, 2)))

    def test_correlation_sensitivity(self):
        for n in range(2, 11):
            vals = [posterior(n, F(i, 20)) for i in range(21)]
            self.assertTrue(all(a >= b for a,b in zip(vals, vals[1:])))
            self.assertEqual(vals[0], S**n/(S**n+FP**n))
            self.assertEqual(vals[-1], S/(S+FP))

    def test_cost_threshold(self):
        t = rho_threshold(5)
        self.assertEqual(t, F(203, 828))
        self.assertEqual(posterior(5, t), F(9, 10))
        self.assertGreater(posterior(5, t-F(1, 1000)), F(9, 10))
        self.assertLess(posterior(5, t+F(1, 1000)), F(9, 10))

    def test_multiple_priors_against_joint(self):
        for n in range(1, 9):
            for rho in (F(0), F(1, 4), F(1, 2), F(3, 4), F(1)):
                for prior in (F(1, 10), F(1, 2), F(9, 10)):
                    ah = vector_probability((1,)*n, S, rho)
                    an = vector_probability((1,)*n, FP, rho)
                    expected = prior*ah/(prior*ah+(1-prior)*an)
                    self.assertEqual(posterior(n, rho, prior), expected)

    def test_negative_control_one_report(self):
        for rho in [F(i, 20) for i in range(21)]:
            self.assertEqual(posterior(1, rho), F(4, 5))


if __name__ == "__main__":
    unittest.main()
