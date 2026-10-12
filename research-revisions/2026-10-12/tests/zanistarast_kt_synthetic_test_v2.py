"""Synthetic load/capacity checks. NOT an empirical test of Zanistarast ontology."""
from math import isclose, isfinite


def _nonnegative_finite(value: float, name: str) -> float:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ValueError(f'{name} must be numeric, not bool/string')
    value = float(value)
    if not isfinite(value) or value < 0:
        raise ValueError(f'{name} must be finite and nonnegative')
    return value


def ratio(load: float, capacity: float) -> float:
    load = _nonnegative_finite(load, 'K')
    capacity = _nonnegative_finite(capacity, 'T')
    if capacity == 0:
        raise ValueError('Capacity T must be > 0')
    return load / capacity


def backlog(arrivals: list[float], capacity: float, initial: float = 0) -> list[float]:
    capacity = _nonnegative_finite(capacity, 'T')
    if capacity == 0:
        raise ValueError('Capacity T must be > 0')
    b = _nonnegative_finite(initial, 'B(0)')
    states = []
    for a in arrivals:
        a = _nonnegative_finite(a, 'K(t)')
        b = max(0.0, b + a - capacity)
        states.append(b)
    return states


def expect_invalid(fn):
    try:
        fn()
    except ValueError:
        return
    raise AssertionError('Invalid input accepted')


if __name__ == '__main__':
    for k, t, expected in [(8, 10, .8), (10, 10, 1), (12, 10, 1.2)]:
        assert isclose(ratio(k, t), expected)
    invalid = [(12, 0), (0, 0), (2, -1), (-1, 10),
               (float('nan'), 10), (10, float('inf')),
               (float('-inf'), 10), (True, 10), ('12', 10)]
    for k, t in invalid:
        expect_invalid(lambda k=k, t=t: ratio(k, t))
    expect_invalid(lambda: backlog([float('nan')], 10))
    expect_invalid(lambda: backlog([12], float('inf')))
    expect_invalid(lambda: backlog([12], 10, float('nan')))
    burst = backlog([12, 12, 12, 8, 8, 8, 8], 10)
    sustained = backlog([12] * 5, 10)
    assert burst == [2, 4, 6, 4, 2, 0, 0], burst
    assert sustained == [2, 4, 6, 8, 10], sustained
    assert burst[-1] == 0
    # S<=1 at each step does not prove stability if there is inherited backlog.
    inherited = backlog([10, 10, 10], 10, initial=7)
    assert inherited == [7, 7, 7]
    print('PASS: 3 ratios, 12 invalid inputs, 3 backlog scenarios, 1 recovery assertion')
    print('BURST:', burst, 'SUSTAINED:', sustained, 'INHERITED:', inherited)