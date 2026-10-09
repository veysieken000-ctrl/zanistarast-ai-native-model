#!/usr/bin/env python3
"""Mabun regenerative stock: synthetic research, NOT empirical validation.
Requires numpy. Deterministic matched-seed policy comparison.
"""
import csv
from pathlib import Path
import numpy as np

OUT=Path(__file__).resolve().parent
SEEDS=300
T=120
K=500.0
S0=320.0
DEMAND=45.0
EFF=0.9
POLICIES=("output_max","needs","needs_recovery")
RATES=(0.35,0.55,0.75)

def run(seed,r,policy):
    rng=np.random.default_rng(seed)
    stock=S0
    carry=0.0
    served=[]
    stocks=[]
    discarded=[]
    for t in range(T):
        climate=max(0.15,1+0.04*rng.standard_normal())
        shock=0.65 if 36<=t<60 else 1.0
        regen=max(0.0,min(K-stock,r*stock*(1-stock/K)*climate*shock))
        target=85.0 if policy=="output_max" else max(0.0,DEMAND/EFF-carry)
        harvest=min(target,stock+regen)
        raw_input=harvest+carry
        goods=EFF*raw_input
        consumed=min(DEMAND,goods)
        scrap=(1-EFF)*raw_input
        new_carry=0.5*scrap if policy=="needs_recovery" else 0.0
        discarded.append(goods-consumed+scrap-new_carry)
        stock=max(0.0,min(K,stock+regen-harvest))
        served.append(consumed/DEMAND)
        stocks.append(stock)
        carry=new_carry
    return {"service":float(np.mean(served)),
            "stock_end":float(stock),
            "low_stock":int(np.min(stocks)<100),
            "waste_total":float(np.sum(discarded)),
            "series_stock":np.array(stocks)}

def main():
    rows=[]
    for r in RATES:
        for seed in range(SEEDS):
            for policy in POLICIES:
                x=run(seed,r,policy)
                rows.append({"r":r,"seed":seed,"policy":policy,
                             **{k:x[k] for k in ("service","stock_end","low_stock","waste_total")}})
    with (OUT/"mabun_stock_runs.csv").open("w",newline="",encoding="utf-8") as f:
        w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
    print("r,policy,mean_service,mean_stock_end,low_stock_rate")
    for r in RATES:
        for p in POLICIES:
            vals=[v for v in rows if v["r"]==r and v["policy"]==p]
            print(f'{r},{p},{np.mean([v["service"] for v in vals]):.6f},'
                  f'{np.mean([v["stock_end"] for v in vals]):.6f},'
                  f'{np.mean([v["low_stock"] for v in vals]):.6f}')
    for p in POLICIES:
        a=run(17,.55,p);b=run(17,.55,p)
        assert np.array_equal(a["series_stock"],b["series_stock"])
        assert np.all((a["series_stock"]>=0)&(a["series_stock"]<=K))
        assert 0<=a["service"]<=1
    print("PASS deterministic, bounded stock, bounded service")

if __name__=="__main__":
    main()
