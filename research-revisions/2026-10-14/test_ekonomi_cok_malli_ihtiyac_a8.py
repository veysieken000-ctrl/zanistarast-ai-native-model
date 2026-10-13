"""A8: deterministic integer allocation enumeration. Python 3 stdlib only."""
from itertools import product

NEED_A = (6, 4)
NEED_B = (2, 4)

def unmet(xf, xw, sf, sw):
    return (
        sum(max(0, n - a) for n, a in zip(NEED_A, (xf, xw)))
        + sum(max(0, n - a) for n, a in zip(NEED_B, (sf - xf, sw - xw)))
    )

cases = candidates = 0
for sf, sw in product(range(11), repeat=2):
    vals = [unmet(xf, xw, sf, sw)
            for xf in range(sf + 1) for xw in range(sw + 1)]
    candidates += len(vals)
    cases += 1
    assert min(vals) == max(0, 8 - sf) + max(0, 8 - sw)
assert (cases, candidates) == (121, 4356)
for sf, sw, optimal, equal_baseline in [
    (8, 8, 0, 2), (10, 6, 2, 3), (7, 8, 1, 3)
]:
    assert min(unmet(xf, xw, sf, sw)
               for xf in range(sf + 1) for xw in range(sw + 1)) == optimal
    assert unmet(sf // 2, sw // 2, sf, sw) == equal_baseline
print("PASS: 121 supply cases; 4356 exhaustive allocations; 3 baselines")
