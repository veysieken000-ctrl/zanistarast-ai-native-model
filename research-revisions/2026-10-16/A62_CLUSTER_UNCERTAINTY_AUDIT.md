# A62 — SPARC galaxy-cluster uncertainty audit (2026-10-16)

Read-only pilot: three SPARC-derived galaxies, 152 radial points (only 3 galaxy clusters); A60 CSV SHA-256 `12eb7ec8b7006c6f310daeb9d36d7d6d966afa85d46951aa916f70ccdddf666f`. Official SPARC Table1 confirms NGC2403, NGC3198, NGC7331 are all Q=1 (selected, not representative). The official Rotmod archive was not byte-verified.

A61 galaxy-equal RAR minus flat RMSE difference = -12.73914 km/s; exact 3^3 galaxy bootstrap has 4/27 nonnegative means; one additional galaxy with delta +38.21742 km/s makes the four-galaxy mean zero. Sign test p=0.5. These are sensitivity checks, not population inference.

New synthetic Gaussian random-effects test: 9 scenarios (G=3,30,175; ICC=0,.3,.7), 3,000 repetitions each, 74,880,000 simulated observations total. For G=3, m=40, ICC=.7, naive 95% CI coverage was 24.53%; cluster-mean t CI coverage 95.27% under *synthetic normal independent-cluster assumptions*. ICC=0 negative-control naive coverage 94.47%. Analytical design effect = 1+(m-1)ICC. Repeated JSON bit-for-bit; independent RMSE/27-bootstrap/27-identity checks passed; A60/A61 regression passed. Full code/report/results are local, not committed.

This is a known statistical method applied to a limited astronomical pilot, not a new dark-matter law or confirmation of Zanistarast ontology. 11 original works and 13 Core HTML are separate; original #10 unverified. Science Core v1 remains closed. No production, canonical, main, DOI, paid provider, or journal changes. Live Mira/OpenAI/Gemini/Ollama/llama.cpp provider success unverified.
