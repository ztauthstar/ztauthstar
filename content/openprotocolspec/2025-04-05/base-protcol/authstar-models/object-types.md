---
title: Object Types
cascade:
  type: docs
weight: 3202
prev: /openprotocolspec/2025-04-05/base-protcol/authstarmodels/ledgers
next: /openprotocolspec/2025-04-05/base-protcol/authstarmodels/manifest-blob
---

An `Auth*` model must be **self-consistent**. All data in the model must be saved and kept in a **valid and consistent state**. The data is stored as objects, using a structure similar to **Git**.

> [!IMPORTANT]
> Git itself is not suitable for production use in this context. It allows any kind of file and does not check structure or content. For this reason, a **custom Git-like object model** is used. This model accepts only valid `Auth*` models and rejects anything invalid.

There are three types of objects:

- **Commit**: A **snapshot** of the `Auth*` model. It links to one or more trees and usually to a previous commit, unless it is the first one.
- **Tree**: A **group of blobs** that together represent part of the model.
- **Blob**: Holds **domain-specific data**, like a policy, schema, [manifest](/openprotocolspec/2025-04-05/base-protcol/authstarmodels/manifest), or other valid element in the model.

The `ledger` points to the **root commit object**, which shows the **initial state** of the model and is used to get the **current state**. The root commit is **immutable** and **cannot be changed**.

You can rebuild the full **history** of the model by **tracing the commit chain**, starting from the root and following each commit's `parent` link to go back in time.

```json
{
  "commits": [
    {
      "committer": "668baf687565485eba524a2131e886f9",
      "committer_timestamp": "2025-06-20T16:43:57+02:00",
      "oid": "1661e08026e0eae1b2c06fa2bb54b8d07c3430c9481b6e0fd74211a7f4ab7d9c",
      "parent": "d23f21aaa6f54ddade9df4ffab3e30462785f257a2c934f01a829ede2f0eaa03",
      "tree": "4aec1bcf14c78b4aadd204028478d7ae6c93ea9d7edabd93c924875e394a8f05"
    },
    {
      "committer": "668baf687565485eba524a2131e886f9",
      "committer_timestamp": "2025-06-20T16:40:35+02:00",
      "oid": "d23f21aaa6f54ddade9df4ffab3e30462785f257a2c934f01a829ede2f0eaa03",
      "parent": "0000000000000000000000000000000000000000000000000000000000000000",
      "tree": "a122af9e17f5384b74cbbdc2dee7ff6863bb24e55d4a5b739f7098686ef34fec"
    }
  ]
}
```
