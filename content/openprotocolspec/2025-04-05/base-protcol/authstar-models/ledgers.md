---
title: Ledgers
cascade:
  type: docs
weight: 3201
prev: /openprotocolspec/2025-04-05/base-protcol/authstar-models
next: /openprotocolspec/2025-04-05/base-protcol/model-types
---

An `auth* model` **MUST** be stored in a Git-like object storage system. A **ledger** represents a collection of versioned `Objects` that conform to specific [Object Types](/openprotocolspec/2025-04-05/base-protcol/authstar-models/object-types/).

> Each `ZTZone` contains one or more ledgers.

A valid ledger **MUST** include the following properties:

- **Ledger ID**: A unique, opaque identifier that distinguishes the ledger globally.
- **Created At**: A timestamp indicating when the ledger was initially created.
- **Updated At**: A timestamp indicating the most recent modification to the ledger.
- **Zone ID**: The identifier of the `ZTZone` to which this ledger is assigned.
- **Name**: A human-readable name that **MUST** be unique within the scope of the associated `ZTZone`.
- **Ref**: A reference to the root commit object representing the current state of the ledger. This **MUST** be a hash-based identifier (e.g., SHA-256) that uniquely identifies the latest committed version.

```json
{
  "ledger_id": "8630aa407c3f4b04b7702852a440b464",
  "created_at": "2025-06-20T14:38:43.633Z",
  "updated_at": "2025-06-20T14:44:45.152Z",
  "zone_id": 273165098782,
  "name": "corporate-policies",
  "ref": "4dcb2492218502302bf10f1ad8826ec7b56ff7e33e8da195cae37676b8789e4b"
}
```

A ledger can be referenced using its `Zone ID` and either its `Name` or `Ledger ID`, using the following URI format:

```plaintext
ztauth://<trust-domain>/<zone-id>/ledgers/<ledger-name>
```

Example:

```plaintext
ztauth://core-platform.internal/273165098782/ledgers/corporate-policies
```
