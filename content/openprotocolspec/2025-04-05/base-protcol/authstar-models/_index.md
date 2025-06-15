---
title: Auth* Models
cascade:
  type: docs
weight: 3200
prev: /openprotocolspec/2025-04-05/base-protcol/identities-actors
next: /openprotocolspec/2025-04-05/base-protcol/notp/
---

The `ZTAuth*` security model requires specific models for `AuthN` (authentication) and `AuthZ` (authorization). These are referred to as `Auth*` models. They are designed to follow `Zero Trust` principles and form the foundation of the `ZTAuth*` protocol.

Each model must meet the following requirements:

- **Transferable**: It can be moved easily between systems and locations without issues.
- **Versionable and Immutable**: It must be tamper-proof, versioned, reviewable at any time.
- **Model-Compliant**: The model must follow the defined structure and contain only valid, well-formed data.
- **Resilient to Disconnection**: It must stay available even when offline and sync later to stay consistent. This means being eventually consistent.
