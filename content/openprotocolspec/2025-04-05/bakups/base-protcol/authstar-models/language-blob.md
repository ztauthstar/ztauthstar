---
title: Language Blob
cascade:
  type: docs
weight: 3205
prev: /openprotocolspec/2025-04-05/base-protcol/authstar-models/manifest-blob
next: /openprotocolspec/2025-04-05/base-protcol/authstar-bindings
---

A `language` blob [`object`](/openprotocolspec/2025-04-05/base-protcol/authstar-models/object-types/) represents a language-specific element within an `auth*` model.

These blobs encapsulate content written in a supported policy or trust language.  

Examples include:

- a `cedar` policy,
- a `rego` rule,
- a schema definition.

The `ZTAuth*` model architecture supports **multi-language composition**: A single model **MAY** include multiple languages, provided that each language blob is clearly typed and **MUST** be interpretable by a corresponding runtime engine.

Language blobs fall into two main categories:

- **Authorization Languages**: Used to express access control logic (e.g., `cedar`, `rego`).
- **Trust Languages**: Used to define trust semantics such as delegation, elevation, or identity relationships.

To ensure consistent interpretation of language blobs, each model **MUST** include a [`manifest`](/openprotocolspec/2025-04-05/base-protcol/authstar-models/manifest-blob/). The manifest provides metadata that describes how each language blob is to be processed, and it **MUST** map each blob to its runtime environment and language type.
