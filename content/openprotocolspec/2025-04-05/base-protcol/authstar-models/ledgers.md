---
title: Ledgers
cascade:
  type: docs
weight: 3201
prev: /openprotocolspec/2025-04-05/base-protcol/authstar-models
next: /openprotocolspec/2025-04-05/base-protcol/object-types
---

An **Auth\*** model must be stored in a Git-like object storage system. A **ledger** is a collection of `Objects` that conform to specific [`Object Types`](/openprotocolspec/2025-04-05/base-protcol/authstar-models/object-types/).

> Each `ZTZone` contains one or more ledgers.

A ledger must include the following properties:

- **Ledger ID**: A unique identifier for the ledger.
- **Created At**: The timestamp indicating when the ledger was created.
- **Updated At**: The timestamp of the most recent update to the ledger.
- **Zone ID**: The identifier of the `ZTZone` to which the ledger belongs.
- **Name**: A human-readable name for the ledger, which must be unique within its zone.
- **Ref**: A reference to the root commit object of the ledger, represented by a hash that uniquely identifies the current state.

```json
{
  "ledger_id": "8630aa407c3f4b04b7702852a440b464",
  "created_at": "2025-06-20T14:38:43.633Z",
  "updated_at": "2025-06-20T14:44:45.152Z",
  "zone_id": 273165098782,
  "name": "corporate-compliance",
  "ref": "4dcb2492218502302bf10f1ad8826ec7b56ff7e33e8da195cae37676b8789e4b"
}
```

A ledger can be referenced using its `Zone ID` and either its name or ledger ID, following the URI format:

```plaintext
ztauth://<trust-domain>/<zone-id>/ledgers/<ledger-name>
```

Example:

```plaintext
ztauth://core-platform.internal/273165098782/ledgers/corporate-compliance
```
