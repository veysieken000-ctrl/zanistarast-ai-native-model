"""Synthetic interval checks for K/T threshold; not an empirical validation."""
from math import isfinite


def classify(k_low: float, k_high: float, t_low: float, t_high: float):
    vals = (k_low, k_high, t_low, t_high)
    if any(isinstance(x, bool) or not isinstance(x, (int, float)) or not isfinite(x) for x in vals):
        raise ValueError('bounds must be finite numbers')
    if not (0 <= k_low <= k_high and 0 < t_low <= t_high):
        raise ValueError('invalid intervals')
    lower = k_low / t_high
    upper = k_high / t_low
    if lower > 1:
        label = 'above'
    elif upper <= 1:
        label = 'at_or_below'
    else:
        label = 'undetermined'
    return lower, upper, label


def run_tests():
    a = classify(9, 11, 9, 11)
    assert a[2] == 'undetermined' and abs(a[0]-9/11)<1e-12 and abs(a[1]-11/9)<1e-12
    b = classify(13, 14, 9, 10)
    assert b == (1.3, 14/9, 'above')
    c = classify(6, 7, 9, 10)
    assert c[2] == 'at_or_below' and abs(c[1]-7/9)<1e-12
    d = classify(10, 10, 10, 10)
    assert d == (1, 1, 'at_or_below')
    for bad in ((1, 2, 0, 10), (2, 1, 9, 10), (float('nan'), 10, 9, 10), (1, 2, 1, float('inf')), (True, 2, 1, 3), (-1, 2, 1, 3)):
        try:
            classify(*bad)
        except ValueError:
            pass
        else:
            raise AssertionError(f'accepted invalid: {bad}')
    print('PASS: 4 interval cases, 6 invalid-input cases')


if __name__ == '__main__':
    run_tests()