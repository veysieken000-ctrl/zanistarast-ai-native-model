#!/usr/bin/env python3
"""Invented causal confounding example; NOT empirical validation of Zanistarast."""
import argparse
import random

def run(n=100000, seed=20261009):
    rng = random.Random(seed)
    cells = {(w, v): [0, 0] for w in (0, 1) for v in (0, 1)}
    for _ in range(n):
        w = int(rng.random() < 0.5)
        v = int(rng.random() < (0.8 if w else 0.2))
        y = int(rng.random() < (0.2 if w else 0.8))
        cells[(w, v)][0] += y
        cells[(w, v)][1] += 1
    rates = {key: yes / total for key, (yes, total) in cells.items()}
    yes1 = sum(cells[(w, 1)][0] for w in (0, 1))
    n1 = sum(cells[(w, 1)][1] for w in (0, 1))
    yes0 = sum(cells[(w, 0)][0] for w in (0, 1))
    n0 = sum(cells[(w, 0)][1] for w in (0, 1))
    naive = yes1 / n1 - yes0 / n0
    adjusted = 0.5 * sum(rates[(w, 1)] - rates[(w, 0)] for w in (0, 1))
    print(f"n={n} seed={seed}")
    print(f"naive risk difference={naive:+.4f} (analytic -0.3600)")
    print(f"adjusted risk difference={adjusted:+.4f} (analytic +0.0000)")
    assert abs(naive + 0.36) < 0.03
    assert abs(adjusted) < 0.03
    return naive, adjusted

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--n", type=int, default=100000)
    parser.add_argument("--seed", type=int, default=20261009)
    args = parser.parse_args()
    if args.n < 10000:
        parser.error("Use n >= 10000 for sampling assertions")
    run(args.n, args.seed)
