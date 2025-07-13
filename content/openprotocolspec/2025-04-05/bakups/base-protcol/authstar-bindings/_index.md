---
title: Auth* Bindings
cascade:
  type: docs
weight: 3300
prev: /openprotocolspec/2025-04-05/base-protcol/authstar-models/language-blob
next: /openprotocolspec/2025-04-05/base-protcol/authstar-bindings/scope-bindings
---

The `auth* binding` defines the mechanism by which **identities** are associated with specific `auth* models`, and how these models are selected and applied within the `ZTAuth*` protocol.

This binding determines the evaluation context for each request and ensures that the appropriate model is used based on the identity, zone, and trust domain involved in the operation.
