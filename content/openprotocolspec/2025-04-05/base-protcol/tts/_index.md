---
title: Transaction Token Service
cascade:
  type: docs
weight: 3400
prev: /openprotocolspec/2025-04-05/base-protcol/authstar-bindings
next: /openprotocolspec/2025-04-05/base-protcol/decision-points
---

The `transaction token service` **MUST** comply with the [OAuth Transaction Token specification](https://www.ietf.org/archive/id/draft-ietf-oauth-transaction-tokens-05.html) and **MUST** implement a defined profile and schema consistent with the requirements of the `ZTAuth*` protocol.

A **Transaction Token** (abbreviated as **tnx token**) encapsulates an **authorization context** for a specific action or request.  
It is typically issued by the **initiating identity** — often a **workload identity** — on behalf of a **target identity** (the *audience*) that is authorized to execute the operation.

The tnx token carries verifiable claims that describe:

- **Who** initiated the transaction,
- **What** action or resource is being requested,
- **Under which context** the authorization was granted.

This structure enables a clear separation between the entity that initiates a transaction and the one that executes it, supporting key features such as:

- **Delegation** of authority,
- **Traceability** of authorization flow,
- Enforcement of **Zero Trust** principles.
