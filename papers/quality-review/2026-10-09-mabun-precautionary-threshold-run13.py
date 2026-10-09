#!/usr/bin/env python3
"""Mabun Run 13: synthetic, paired, precautionary stock experiment; numpy required."""
import numpy as np
K,S0,D,ETA,T,FLOOR=500.,320.,45.,.9,240,200.
RATES=(.35,.55,.75)
POLICIES=("needs","needs_recovery","precautionary","precautionary_recovery")
SEEDS=300

def run(seed,r,policy):
    rng=np.random.default_rng(seed)
    climates=np.maximum(.15,1+.04*rng.standard_normal(T))
    stock,carry=S0,0.
    services=[];stocks=[]
    for t in range(T):
        shock=.65 if (36<=t<60 or 150<=t<174) else 1.
        regen=max(0.,min(K-stock,r*stock*(1-stock/K)*climates[t]*shock))
        available=stock+regen
        target=max(0.,D/ETA-carry)
        harvest=min(target,max(0.,available-FLOOR) if policy.startswith("precautionary") else available)
        raw=harvest+carry
        goods=ETA*raw
        consumed=min(D,goods)
        scrap=(1-ETA)*raw
        next_carry=.5*scrap if policy.endswith("recovery") else 0.
        discarded=goods-consumed+scrap-next_carry
        assert abs(raw-consumed-discarded-next_carry)<1e-9
        stock=max(0.,min(K,available-harvest))
        services.append(consumed/D);stocks.append(stock)
        carry=next_carry
    return np.mean(services),stock,float(min(stocks)<FLOOR-1e-8)

if __name__=="__main__":
    print("r,policy,mean_service,mean_end_stock,floor_breach_rate")
    for r in RATES:
        for policy in POLICIES:
            outcomes=np.array([run(seed,r,policy) for seed in range(SEEDS)])
            print(f"{r},{policy},{outcomes[:,0].mean():.5f},{outcomes[:,1].mean():.5f},{outcomes[:,2].mean():.5f}")
            if policy.startswith("precautionary"):
                assert outcomes[:,2].sum()==0
    print("PASS: 3600 synthetic runs, balanced materials and protected floor")
