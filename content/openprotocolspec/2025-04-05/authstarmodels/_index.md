---
title: Auth* Models
cascade:
  type: docs
weight: 40
prev: openprotocolspec/2025-04-05/
next: openprotocolspec/2025-04-05/authstarmodels/model
---

The `ZTAuth*` security model requires specific models for `AuthN` (authentication) and `AuthZ` (authorization). These are referred to as `Auth*` models. They are designed to follow the principles of `Zero Trust` and represent the foundation of the `ZTAuth*` protocol.  

Each model must satisfy the following features:

- **Transferable**: They can move easily between different systems and locations without issues.
- **Versionable and Immutable**: The data must be tamper-proof, versioned, reviewable at any time, and compatible with older versions.
- **Resilient to Disconnection**: They stay consistent even when offline, and sync when the connection is restored.
