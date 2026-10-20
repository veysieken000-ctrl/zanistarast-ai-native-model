#!/usr/bin/env python3
"""ZANABUN-01: deterministic synthetic demonstration of correlated witness error.
This is NOT evidence about human witnesses or the founder's metaphysical claims.
"""
from __future__ import annotations
import math
import random

SEED = 20261020
REPETITIONS = 20000
SIZES = (1, 4, 16)
COMMON_SD = (0.0, 2.0)
PRIVATE_SD = 1.0

def experiment() -> list[tuple[float, int, float, float]]:
    rng = random.Random(SEED)
    rows = []
    for tau in COMMON_SD:
        for n in SIZES:
            squared_error = 0.0
            for _ in range(REPETITIONS):
                shared = rng.gauss(0.0, tau)
                private_mean = sum(rng.gauss(0.0, PRIVATE_SD) for _ in range(n)) / n
                squared_error += (shared + private_mean) ** 2
            simulated_rmse = math.sqrt(squared_error / REPETITIONS)
            predicted_rmse = math.sqrt(tau * tau + PRIVATE_SD * PRIVATE_SD / n)
            rows.append((tau, n, simulated_rmse, predicted_rmse))
    return rows

def test_invariants() -> None:
    # Exact counterexample: full agreement is compatible with shared bias.
    theta, reports = 0.0, [5.0] * 4
    average = sum(reports) / len(reports)
    spread = sum((w - average) ** 2 for w in reports) / len(reports)
    assert spread == 0.0 and abs(average - theta) == 5.0

    # Analytic model: more observers cannot eliminate shared-error variance.
    for n in SIZES:
        total_variance = 2.0 ** 2 + PRIVATE_SD ** 2 / n
        assert total_variance >= 4.0
    assert math.isclose(math.sqrt(4.0 + 1.0 / 16), 2.0155644370746373)

def main() -> None:
    test_invariants()
    print("Synthetic data only; fixed seed:", SEED)
    print("tau,n,simulated_rmse,analytic_rmse")
    for tau, n, observed, expected in experiment():
        assert abs(observed - expected) < 0.06, (tau, n, observed, expected)
        print(f"{tau:g},{n},{observed:.4f},{expected:.4f}")
    print("PASS: analytic invariants and synthetic tolerance checks")

if __name__ == "__main__":
    main()
