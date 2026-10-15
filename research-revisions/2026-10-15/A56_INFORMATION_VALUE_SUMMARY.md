# A56 Research summary (2026-10-15)

Two equally likely demand states (2,1) and (1,2), stock 3. Optimal expected score without information: 0.75; perfect information: 1. With signal accuracy p, timely probability q, normalized cost c, buying information gives 0.75 + q*abs(p-0.5)/2 - c. For p=.8,q=.6,c=.05: 0.79. Exact independent checks passed on 330 parameter combinations; synthetic Monte Carlo n=300000 gave 0.790290. No empirical validation. Code SHA256: 5c8562d91cc719841edc122297fbfdb582d5dfa28e072479312ad9e15ca191fa. Science Core v1 remains closed.
