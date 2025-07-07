---
title: Transaction Token Service
cascade:
  type: docs
weight: 3400
prev: /openprotocolspec/2025-04-05/base-protcol/authstar-bindings/trust-relationships/
next: /openprotocolspec/2025-04-05/base-protcol/tts/tx-token
---

The `transaction token service` **MUST** comply with the [OAuth Transaction Token specification](https://www.ietf.org/archive/id/draft-ietf-oauth-transaction-tokens-05.html) and **MUST** implement a defined profile and schema consistent with the requirements of the `ZTAuth*` protocol.

A **Transaction Token** (abbreviated as **tnx token**) encapsulates an **Authorization Request Context** for a specific action or request. It is typically issued by the **initiating identity** — often a **workload identity** — on behalf of a **subject identity** (the *audience*) that is authorized to execute the operation.

The tnx token carries verifiable claims that describe:

- **Who** initiated the transaction,
- **What** action or resource is being requested,
- **Under which context** the authorization was granted.

This structure enables a clear separation between the **initiating identity** and the **executing identity**, allowing systems to maintain a strong and verifiable authorization model. It supports the following key properties:

- **Execution Traceability** – Clear distinction and logging of the entity that physically executes the action versus the identity being impersonated.
- **Identity Auditing** – Accurate tracking of both the impersonated identity and the actual identity executing the operation.
- **Zero Trust Enforcement** – Ensures strict separation of duties and policy-based authorization, aligned with Zero Trust principles.
