---
title: Auth* Models
cascade:
  type: docs
draft: true
weight: 3200
prev: /openprotocolspec/2025-04-05/base-protcol/domains-zones
next: /openprotocolspec/2025-04-05/base-protcol/authstar-models/ledgers
---

**ZTAuth\*** defines an authorization model and a trust model — collectively referred to as `auth* models`.
These models are designed in alignment with the core principles of Zero Trust and form the foundation of the `ZTAuth*` protocol.

Each `auth* model` **MUST** satisfy the following properties:

- **Model-Compliant**: The model **MUST** adhere to the defined schema and contain only valid and well-formed data structures.
- **Transferable**: The model **MUST** be portable across systems and locations without loss of integrity or fidelity.
- **Versionable and Immutable**: The model **MUST** support immutable versioning, allowing any revision to be identified, verified, and reviewed at any point in time.
- **Resilient to Disconnection**: The model **MUST** remain available in offline scenarios and **MUST** support asynchronous synchronization to maintain consistency. This implies conformance to an **eventual consistency** model.
