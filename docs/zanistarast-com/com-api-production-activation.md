# zanistarast.com API — Production Activation Gate

Status: CODE READY / EXTERNAL ACTIVATION PENDING
Date: 2026-09-27

## Code-side evidence
- Render Blueprint service: zanistarast-com-api
- root: zanistarast-com-api
- health path: /health
- readiness path: /readiness
- free plan, zero external runtime dependencies
- explicit allowlisted CORS
- no-store JSON responses
- nosniff response protection
- build evidence field
- denied-origin preflight test
- smoke CI green before this activation record

## External activation evidence required
Do not set ZANISTARAST_API_BASE until all are observed from the deployed service:
1. Render service exists and deployment is successful.
2. Provider-issued endpoint is HTTPS.
3. GET /health returns 200 and service=zanistarast-com-api.
4. GET /readiness returns 200 and publication=fail-closed.
5. Allowed GitHub Pages origin receives Access-Control-Allow-Origin.
6. Unapproved origin receives no CORS permission.
7. A fresh deployment reports traceable build evidence.
8. Frontend is configured with the verified HTTPS endpoint and smoke-tested again.

The repository does not claim a Render URL until the provider has actually issued one. No URL is invented.

## Domain boundary
The custom zanistarast.com domain is not required to activate and verify the provider HTTPS API endpoint. When the domain is later acquired, CORS can be extended to the verified custom origin and re-tested.
