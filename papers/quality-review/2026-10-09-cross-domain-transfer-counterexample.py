#!/usr/bin/env python3
"""Synthetic cross-domain transfer counterexample, not empirical Zanistarast evidence.

Python 3 standard library only. All examples and thresholds are hypothetical.
"""
import math
import random


def make_domain(name, n, seed):
    assert name in ('A', 'B', 'C') and n > 0
    rng = random.Random(seed)
    rows = []
    for _ in range(n):
        x = rng.uniform(-1.0, 1.0)
        y = int(x > 0.0)
        if name == 'C':
            y = 1 - y  # Domain shift: same variable, reversed relationship.
        if rng.random() < 0.05:
            y = 1 - y  # Independent 5% label noise.
        rows.append((x, y))
    return rows


def predict(x, orientation):
    return int(x > 0.0) if orientation == 1 else int(x <= 0.0)


def accuracy(rows, orientation):
    return sum(predict(x, orientation) == y for x, y in rows) / len(rows)


def train_orientation(rows):
    return 1 if accuracy(rows, 1) >= accuracy(rows, -1) else -1


def wilson_interval(successes, total, z=1.96):
    p = successes / total
    d = 1.0 + z * z / total
    center = (p + z * z / (2 * total)) / d
    half = z * math.sqrt(p * (1 - p) / total + z * z / (4 * total * total)) / d
    return center - half, center + half


def evaluate():
    # Training and source validation use independent seeds. Target C never trains or tunes the rule.
    training = make_domain('A', 2000, 101) + make_domain('B', 2000, 102)
    orientation = train_orientation(training)
    assert orientation == 1
    results = {}
    for name, seed in (('A', 201), ('B', 202), ('C', 203)):
        rows = make_domain(name, 4000, seed)
        hits = sum(predict(x, orientation) == y for x, y in rows)
        lower, upper = wilson_interval(hits, len(rows))
        results[name] = (hits / len(rows), lower, upper)
    return orientation, results


if __name__ == '__main__':
    orientation, results = evaluate()
    print('Synthetic data only; no Zanistarast validation')
    print('Trained threshold orientation:', orientation)
    for domain, (accuracy_value, low, high) in results.items():
        print(f'{domain}: accuracy={accuracy_value:.4f}, Wilson95=[{low:.4f}, {high:.4f}]')
    assert results['A'][0] > 0.90 and results['B'][0] > 0.90
    assert results['C'][0] < 0.10
    assert evaluate() == (orientation, results)  # Reproducibility check.
    print('PASS: held-out domain shift detected and deterministic repeat matched')
