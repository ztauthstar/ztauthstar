---
title: Object Types
cascade:
  type: docs
weight: 3203
prev: /openprotocolspec/2025-04-05/base-protcol/authstarmodels/model-types
next: /openprotocolspec/2025-04-05/base-protcol/authstarmodels/manifest-blob
---

An `auth*` models **MUST** be self-consistent. All data within the model **MUST** be stored and maintained in a valid and internally consistent state. Data is persisted as immutable objects using a Git-like object model.

> [!IMPORTANT]
> Standard Git implementations are **NOT** suitable for production use in this context. Git permits arbitrary file types and lacks structural validation. Therefore, `ZTAuth*` uses a **custom Git-like object model** that strictly enforces schema correctness and rejects invalid or malformed content.

The object model defines three object types:

- **Commit**: Represents a **snapshot** of the `auth*` models. A commit object references one or more tree objects, and optionally a `parent` commit (absent in the case of the initial commit).
- **Tree**: Represents a **logical grouping of blob objects**. A tree object maps names to blobs (or other trees) and defines part of the model structure.
- **Blob**: Contains **domain-specific content**, such as a policy, schema, [manifest](/openprotocolspec/2025-04-05/base-protcol/authstarmodels/manifest), or other valid model element.

Each `ledger` **MUST** reference a **root commit object**, which defines the initial state of the model and is used to derive the current state. The root commit is **immutable** and **MUST NOT** be altered after creation.

The full **history** of the model **MAY** be reconstructed by traversing the commit chain, starting from the root and following the `parent` references in each commit object.

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
