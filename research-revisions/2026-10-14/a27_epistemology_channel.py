"""A27: synthetic binary observation channel, not a theory of consciousness.
Reproduce: python3 a27_epistemology_channel.py
Dependencies: Python 3 standard library only.
"""
import math
import random
import unittest

SEED = 20261014
N = 10000
PERMUTATIONS = 199

def entropy(p):
    if not 0 <= p <= 1:
        raise ValueError('probability must be in [0,1]')
    return 0.0 if p in (0, 1) else -p * math.log2(p) - (1-p)*math.log2(1-p)

def theoretical_mi(error_rate):
    return 1 - entropy(error_rate)

def generate(n, error_rate, seed):
    rng = random.Random(seed)
    xs = [rng.randrange(2) for _ in range(n)]
    ys = [x ^ (rng.random() < error_rate) for x in xs]
    return xs, ys

def empirical_mi(xs, ys):
    if not xs or len(xs) != len(ys):
        raise ValueError('nonempty equal-length observations required')
    n = len(xs)
    joint = [[0,0],[0,0]]
    for x,y in zip(xs,ys):
        if x not in (0,1) or y not in (0,1):
            raise ValueError('binary inputs required')
        joint[x][y] += 1
    px = [sum(row)/n for row in joint]
    py = [sum(joint[x][y] for x in (0,1))/n for y in (0,1)]
    return sum((joint[x][y]/n)*math.log2((joint[x][y]/n)/(px[x]*py[y]))
               for x in (0,1) for y in (0,1) if joint[x][y])

def permutation_test(xs, ys, repeats=PERMUTATIONS, seed=SEED+1):
    observed = empirical_mi(xs,ys)
    rng = random.Random(seed)
    shuffled = ys.copy()
    exceed = 0
    maximum_null = 0.0
    for _ in range(repeats):
        rng.shuffle(shuffled)
        null = empirical_mi(xs, shuffled)
        exceed += (null >= observed)
        maximum_null = max(maximum_null, null)
    return observed, (exceed + 1)/(repeats + 1), maximum_null

class A27Tests(unittest.TestCase):
    def test_perfect_channel(self):
        self.assertEqual(theoretical_mi(0), 1)
    def test_independent_channel(self):
        self.assertEqual(theoretical_mi(.5), 0)
    def test_noisy_channel(self):
        self.assertAlmostEqual(theoretical_mi(.1), .5310044064107188, places=12)
    def test_channel_symmetry(self):
        self.assertAlmostEqual(theoretical_mi(.1), theoretical_mi(.9), places=12)
    def test_invalid_probability(self):
        with self.assertRaises(ValueError): entropy(1.1)
    def test_synthetic_empirical(self):
        x,y=generate(N,.1,SEED)
        self.assertAlmostEqual(empirical_mi(x,y), theoretical_mi(.1), delta=.03)
        self.assertGreater(sum(a==b for a,b in zip(x,y))/N,.87)
    def test_permutation_against_independence(self):
        x,y=generate(N,.1,SEED)
        obs,p,maxnull=permutation_test(x,y)
        self.assertGreater(obs,.48)
        self.assertEqual(p,.005)
        self.assertLess(maxnull,.005)
    def test_null_empirical(self):
        x,y=generate(N,.5,SEED)
        self.assertLess(empirical_mi(x,y),.005)
    def test_invalid_observations(self):
        with self.assertRaises(ValueError): empirical_mi([0],[2])
        with self.assertRaises(ValueError): empirical_mi([0],[])

if __name__ == '__main__':
    unittest.main(verbosity=2,exit=False)
    x,y=generate(N,.1,SEED)
    obs,p,maxnull=permutation_test(x,y)
    print(f'A27_RESULT n={N} seed={SEED} error_rate=0.1 theory_mi={theoretical_mi(.1):.9f} empirical_mi={obs:.9f} accuracy={sum(a==b for a,b in zip(x,y))/N:.6f} baseline_accuracy=0.5 permutations={PERMUTATIONS} p={p:.6f} max_null_mi={maxnull:.9f}')
