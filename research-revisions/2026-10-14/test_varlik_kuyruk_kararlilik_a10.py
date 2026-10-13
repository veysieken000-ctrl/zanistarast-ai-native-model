"""A10: deterministic capacity/queue counterexamples and exhaustive periodic checks.
Python >=3.9 standard library only. No random numbers, APIs, or real-world data.
Run: python3 test_varlik_kuyruk_kararlilik_a10.py
"""
from itertools import product


def queue(arrivals, capacity):
    assert capacity >= 0 and all(k >= 0 for k in arrivals)
    backlog = 0
    history = [0]
    for k in arrivals:
        backlog = max(0, backlog + k - capacity)
        history.append(backlog)
    return history


def suffix_formula(net_load, end):
    """Independent O(n^2) closed-form evaluation of Lindley's recursion, Q0=0."""
    return max([0] + [sum(net_load[start:end]) for start in range(end)])


def max_interval_excess(arrivals, capacity):
    """Finite-horizon envelope sigma for rho=capacity."""
    net = [k - capacity for k in arrivals]
    return max(suffix_formula(net, end) for end in range(len(net) + 1))


def run():
    alphabet = (-2, -1, 0, 1, 2)
    tested = 0
    for period in range(1, 6):
        for net_period in product(alphabet, repeat=period):
            arrivals = [v + 2 for v in net_period] * 8
            net = list(net_period) * 8
            history = queue(arrivals, 2)
            assert all(history[end] == suffix_formula(net, end)
                       for end in range(len(net) + 1))
            drift = sum(net_period)
            if drift <= 0:
                assert max(history) <= 2 * period * max(0, *net_period)
            else:
                assert history[-1] >= 8 * drift
            tested += 1
    assert tested == sum(5**p for p in range(1, 6)) == 3905

    transient = queue([12, 8] * 10, 10)
    overload = queue([13, 9] * 10, 10)
    capacity_added = queue([13, 9] * 10, 11)
    optimized = queue([11, 9] * 10, 10)
    assert (transient[-1], max(transient)) == (0, 2)
    assert (overload[-1], max(overload)) == (20, 21)
    assert (capacity_added[-1], max(capacity_added)) == (0, 2)
    assert (optimized[-1], max(optimized)) == (0, 1)
    assert max_interval_excess([12, 8] * 10, 10) == 2

    # Sparse bursts: long-run mean arrival -> 0, but peak backlog -> infinity.
    last_burst = 4**8
    arrivals = [0] * (last_burst + 1)
    for k in range(1, 9):
        arrivals[4**k] = 2**k
    sparse = queue(arrivals, 1)
    for k in range(1, 9):
        assert sparse[4**k] == 0
        assert sparse[4**k + 1] == 2**k - 1
    assert sum(arrivals) == 510
    assert sparse[-1] == 255
    assert sum(arrivals) / len(arrivals) < 0.01

    print(f'PASS: {tested} exhaustive periodic sequences; Lindley vs suffix formula')
    print('PASS: periodic drift signs and bounded backlog for nonpositive drift')
    print('PASS: four intervention baselines; envelope sigma=2')
    print(f'PASS: sparse bursts, N={len(arrivals)}, arrivals={sum(arrivals)}, '
          f'mean={sum(arrivals)/len(arrivals):.8f}, peak_backlog={max(sparse)}')


if __name__ == '__main__':
    run()
