# A50 Research note — 2026-10-15

Isolated research; no changes to canonical materials.

Two essential goods share a route. Stocks and demands are two units per good; the route carries three units total. A pooled baseline and a per-good independent-capacity baseline both permit complete coverage. The shared-capacity integer model permits a common coverage fraction of only 1/2. Raising route capacity to four restores full coverage.

A local deterministic Python study (seed 2026101550) ran 180 synthetic scenarios, 720 bound/monotonicity checks, and 729 independent MILP comparisons against exhaustive dynamic programming. All checks passed. Code SHA256: 3ca91030e3cd38f51e5b537c43d78f03e4cd3b1ed2594ecd029cada2d42132aa. The code and full report are local artifacts; this note alone does not establish their GitHub availability.

This applies established multicommodity-flow methods, not a new theorem or empirical discovery. Real data, ethical assessment, source-document verification, journal selection, and external replication remain open. Science Core v1 stays closed.