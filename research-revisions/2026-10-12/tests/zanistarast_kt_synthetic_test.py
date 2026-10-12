"""Synthetic K/T load-vs-capacity counterexample, NOT an empirical Zanistarast test."""
from math import isclose


def ratio(load: float, capacity: float) -> float:
    if capacity <= 0:
        raise ValueError('Capacity T must be > 0')
    if load < 0:
        raise ValueError('Load K must be >= 0')
    return load / capacity


def backlog(arrivals: list[float], capacity: float) -> list[float]:
    if capacity <= 0:
        raise ValueError('Capacity must be positive')
    b = 0.0
    states = []
    for a in arrivals:
        if a < 0:
            raise ValueError('Negative arrivals invalid')
        b = max(0.0, b + a - capacity)
        states.append(b)
    return states


if __name__ == '__main__':
    assert isclose(ratio(8, 10), .8)
    assert isclose(ratio(10, 10), 1.0)
    assert isclose(ratio(12, 10), 1.2)
    for k, t in [(12, 0), (0, 0), (2, -1), (-1, 10)]:
        try:
            ratio(k, t)
        except ValueError:
            pass
        else:
            raise AssertionError(f'Invalid input accepted: {k}, {t}')
    burst = backlog([12, 12, 12, 8, 8, 8, 8], 10)
    assert burst == [2, 4, 6, 4, 2, 0, 0], burst
    sustained = backlog([12] * 5, 10)
    assert sustained == [2, 4, 6, 8, 10], sustained
    assert burst[-1] == 0  # backlog clears without new layer or system failure
    print('PASS: 3 ratio cases, 4 invalid-input cases, 2 backlog scenarios, 1 recovery assertion')
    print('BURST_BACKLOG:', burst)
    print('SUSTAINED_BACKLOG:', sustained)