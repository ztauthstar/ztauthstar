---
title: Transaction Token Service
cascade:
  type: docs
weight: 3400
prev: /openprotocolspec/2025-04-05/base-protcol/authstar-bindings
next: /openprotocolspec/2025-04-05/base-protcol/decision-points
---

The `transaction token service` must comply with the [OAuth Transaction Token](https://www.ietf.org/archive/id/draft-ietf-oauth-transaction-tokens-05.html) specification and implement a defined profile and schema.

A **Transaction Token (tnx token)** is used to encapsulate an **authorization context** for a specific action or request. It is typically created by the **initiating identity** — often a **workload identity** — on behalf of a **target identity** (the audience) that is intended to execute the operation.

This token carries verifiable information about the **who**, **what**, and **under which context** the operation is authorized. It enables a clear separation between the system initiating the transaction and the entity actually executing it, supporting patterns like **delegation**, **traceability**, and **Zero Trust Authorization**.
