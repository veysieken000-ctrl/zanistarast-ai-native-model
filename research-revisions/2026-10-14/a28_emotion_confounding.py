"""A28: Synthetic confounding demonstration for comparative emotion-behavior research.

Python 3 standard library. No animal or human subjects; no claim of emotion detection.
Run: python3 a28_emotion_confounding.py
"""
from fractions import Fraction as Q
import random
import unittest

SEED = 20261014
N = 100000


def p_familiar(u):
    if u not in (0, 1):
        raise ValueError('u must be binary')
    return Q(4, 5) if u else Q(1, 5)


def p_behavior(u, familiar, effect=Q(0)):
    if u not in (0, 1) or familiar not in (0, 1):
        raise ValueError('binary inputs required')
    p = Q(1, 5) + Q(3, 5) * u + effect * familiar
    if not 0 <= p <= 1:
        raise ValueError('outcome probability outside [0,1]')
    return p


def joint(effect=Q(0), randomized=False):
    """Exact joint distribution P(U,F,Y); U is observed only for audit."""
    result = {}
    for u in (0, 1):
        for f in (0, 1):
            pf = Q(1, 2) if randomized else p_familiar(u)
            pf = pf if f else 1 - pf
            py = p_behavior(u, f, effect)
            for y in (0, 1):
                result[u, f, y] = Q(1, 2) * pf * (py if y else 1 - py)
    assert sum(result.values()) == 1
    return result


def conditional_risk(j, f, u=None):
    den = sum(prob for (uu, ff, y), prob in j.items()
              if ff == f and (u is None or uu == u))
    if not den:
        raise ValueError('empty stratum')
    num = sum(prob for (uu, ff, y), prob in j.items()
              if ff == f and y == 1 and (u is None or uu == u))
    return num / den


def naive_difference(j):
    return conditional_risk(j, 1) - conditional_risk(j, 0)


def standardized_difference(j):
    # Standardize both groups to the same U distribution, P(U)=1/2.
    return sum(Q(1, 2) * (conditional_risk(j, 1, u) - conditional_risk(j, 0, u))
               for u in (0, 1))


def sample(n=N, effect=Q(0), randomized=False, seed=SEED):
    if n <= 0:
        raise ValueError('n must be positive')
    rng = random.Random(seed)
    data = []
    for _ in range(n):
        u = int(rng.random() < 0.5)
        f = int(rng.random() < (0.5 if randomized else float(p_familiar(u))))
        y = int(rng.random() < float(p_behavior(u, f, effect)))
        data.append((u, f, y))
    return data


def estimate(data):
    # Risk difference unadjusted, and U-stratified with equal target weights.
    def risk(f, u=None):
        z = [y for uu, ff, y in data if ff == f and (u is None or uu == u)]
        if not z:
            raise ValueError('empty stratum')
        return sum(z) / len(z)
    return risk(1) - risk(0), sum(0.5 * (risk(1, u) - risk(0, u)) for u in (0, 1))


class A28Tests(unittest.TestCase):
    def test_distribution_normalized(self):
        self.assertEqual(sum(joint().values()), 1)

    def test_no_effect_naive_spurious(self):
        self.assertEqual(naive_difference(joint()), Q(9, 25))

    def test_no_effect_adjusted_zero(self):
        self.assertEqual(standardized_difference(joint()), 0)

    def test_no_effect_stratum_zero(self):
        for u in (0, 1):
            self.assertEqual(conditional_risk(joint(), 1, u), conditional_risk(joint(), 0, u))

    def test_true_effect_naive_overestimates(self):
        j = joint(Q(1, 10))
        self.assertEqual(naive_difference(j), Q(23, 50))
        self.assertEqual(standardized_difference(j), Q(1, 10))

    def test_randomized_unbiased(self):
        self.assertEqual(naive_difference(joint(randomized=True)), 0)
        self.assertEqual(naive_difference(joint(Q(1, 10), randomized=True)), Q(1, 10))

    def test_invalid_probability(self):
        with self.assertRaises(ValueError):
            p_behavior(1, 1, Q(1, 2))

    def test_invalid_binary(self):
        with self.assertRaises(ValueError):
            p_behavior(2, 0)

    def test_seed_reproducibility(self):
        self.assertEqual(sample(100, seed=123), sample(100, seed=123))

    def test_simulated_no_effect(self):
        raw, adj = estimate(sample())
        self.assertAlmostEqual(raw, 0.36, delta=0.018)
        self.assertAlmostEqual(adj, 0.0, delta=0.018)

    def test_simulated_true_effect(self):
        raw, adj = estimate(sample(effect=Q(1, 10)))
        self.assertAlmostEqual(raw, 0.46, delta=0.018)
        self.assertAlmostEqual(adj, 0.1, delta=0.018)

    def test_simulated_randomized(self):
        raw, adj = estimate(sample(randomized=True))
        self.assertAlmostEqual(raw, 0.0, delta=0.018)
        self.assertAlmostEqual(adj, 0.0, delta=0.018)


if __name__ == '__main__':
    unittest.main(verbosity=2, exit=False)
    for name, effect, randomized in [('observational_null', Q(0), False),
                                     ('observational_effect', Q(1, 10), False),
                                     ('randomized_null', Q(0), True)]:
        j = joint(effect, randomized)
        obs = estimate(sample(effect=effect, randomized=randomized))
        print('A28_RESULT', name, 'N=', N, 'seed=', SEED,
              'exact_naive=', float(naive_difference(j)),
              'exact_adjusted=', float(standardized_difference(j)),
              'sample_naive=', round(obs[0], 6),
              'sample_adjusted=', round(obs[1], 6))
