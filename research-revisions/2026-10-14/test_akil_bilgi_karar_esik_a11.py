"""A11: exact dependence-robust evidence thresholds; standard-library only.
Run: python3 test_akil_bilgi_karar_esik_a11.py
Synthetic finite probability tables, NOT empirical evidence.
"""
from fractions import Fraction as F
from itertools import product


def joint(a, marginal):
    """P(++), P(+-), P(-+), P(--), equal marginals."""
    return (a, marginal-a, marginal-a, 1-2*marginal+a)


def posterior(prior, a, b):
    return prior*a/(prior*a+(1-prior)*b)


def lower(prior, sensitivity=F(4,5), false_positive=F(1,5)):
    a_min = max(F(0), 2*sensitivity-1)
    return posterior(prior, a_min, false_positive)


def independent(prior, sensitivity=F(4,5), false_positive=F(1,5)):
    return posterior(prior, sensitivity*sensitivity, false_positive*false_positive)


def robust_prior_threshold(tau, sensitivity=F(4,5), false_positive=F(1,5)):
    a_min = max(F(0), 2*sensitivity-1)
    return tau*false_positive / ((1-tau)*a_min+tau*false_positive)


def independent_prior_threshold(tau, sensitivity=F(4,5), false_positive=F(1,5)):
    a, b = sensitivity*sensitivity, false_positive*false_positive
    return tau*b/((1-tau)*a+tau*b)


def run():
    s, f = F(4,5), F(1,5)
    grid = [(F(i,100), F(j,100)) for i in range(60,81) for j in range(0,21)]
    assert len(grid) == 441
    priors = [F(i,100) for i in range(1,100)]
    thresholds = [F(1,2), F(3,4), F(9,10), F(19,20)]
    posterior_checks = 0
    classification_checks = 0
    for p in priors:
        lo = lower(p)
        assert lo == 3*p/(1+2*p)
        assert independent(p) == 16*p/(1+15*p)
        assert posterior(p, s, f) == 4*p/(1+3*p)  # exact-copy baseline
        values = []
        for a,b in grid:
            jh, jn = joint(a,s), joint(b,f)
            assert all(x>=0 for x in jh+jn)
            assert sum(jh)==sum(jn)==1
            assert jh[0]+jh[1]==jh[0]+jh[2]==s
            assert jn[0]+jn[1]==jn[0]+jn[2]==f
            value = posterior(p,a,b)
            assert lo <= value <= 1
            values.append(value)
            posterior_checks += 1
        assert min(values)==lo and max(values)==1
        for tau in thresholds:
            assert (lo >= tau) == (p >= robust_prior_threshold(tau))
            assert (independent(p) >= tau) == (p >= independent_prior_threshold(tau))
            classification_checks += 1

    tau=F(9,10)
    assert robust_prior_threshold(tau)==F(3,4)
    assert independent_prior_threshold(tau)==F(9,25)
    assert lower(F(1,2))==F(3,4)
    assert independent(F(1,2))==F(16,17)
    assert lower(F(3,4))==tau
    assert independent(F(9,25))==tau
    assert posterior(F(1,2), F(3,5), F(1,5))==F(3,4)
    assert posterior(F(1,2), F(3,5), F(0))==1

    # Sensitivity bounds on assumed single-report performance:
    # s in [3/4,17/20], f in [3/20,1/4]; lower worst at min s, max f.
    worst_s, worst_f=F(3,4),F(1,4)
    best_s, best_f=F(17,20),F(3,20)
    assert lower(F(1,2),worst_s,worst_f)==F(2,3)
    assert lower(F(1,2),best_s,best_f)==F(14,17)
    assert robust_prior_threshold(tau,worst_s,worst_f)==F(9,11)
    sensitivity_checks=0
    for s0,f0,p,tau0 in product(
        [F(3,4),F(4,5),F(17,20)],
        [F(3,20),F(1,5),F(1,4)],
        priors, thresholds
    ):
        lo=lower(p,s0,f0)
        assert (lo>=tau0)==(p>=robust_prior_threshold(tau0,s0,f0))
        assert lower(p,worst_s,worst_f)<=lo<=lower(p,best_s,best_f)
        sensitivity_checks+=1

    print(f'PASS: {posterior_checks} exact posterior/coupling checks (99 priors x 441 joints)')
    print(f'PASS: {classification_checks} nominal prior/decision threshold checks')
    print(f'PASS: {sensitivity_checks} performance sensitivity/threshold checks')
    print('PASS: cost ratio 9:1, robust prior threshold 3/4, independence threshold 9/25')
    print('PASS: performance uncertainty worst-case prior threshold 9/11')

if __name__=='__main__':
    run()
