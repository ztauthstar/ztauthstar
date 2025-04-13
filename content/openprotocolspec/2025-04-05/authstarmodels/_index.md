---
title: Auth* Models
cascade:
  type: docs
weight: 40
prev: /openprotocolspec/2025-04-05/actormodels
next: /openprotocolspec/2025-04-05/authstarmodels/model
---

The `ZTAuth*` security model requires specific models for `AuthN` (authentication) and `AuthZ` (authorization). These are referred to as `Auth*` models. They are designed to follow `Zero Trust` principles and form the foundation of the `ZTAuth*` protocol.

Each model must meet the following requirements:

- **Transferable**: It can be moved easily between systems and locations without issues.
- **Versionable and Immutable**: It must be tamper-proof, versioned, reviewable at any time.
- **Resilient to Disconnection**: It must stay available even when offline and sync later to stay consistent. This means being eventually consistent.
