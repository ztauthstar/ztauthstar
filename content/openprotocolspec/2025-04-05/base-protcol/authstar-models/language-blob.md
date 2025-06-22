---
title: Language Blob
cascade:
  type: docs
weight: 3204
prev: /openprotocolspec/2025-04-05/base-protcol/authstar-models/manifest-blob
next: /openprotocolspec/2025-04-05/base-protcol/zts
---

A `language` blob [`object`](/openprotocolspec/2025-04-05/base-protcol/authstar-models/object-types/) is a data structure that defines a language-specific element.

For example, it can represent a specific policy written in a supported language such as a `cedar` policy, a `rego` rule, or a schema. 

The key requirement is that **multiple languages can be used within the same model**, and that each language element must be interpretable.

There are different types of languages:

- **AuthZ languages** such as `cedar`, `rego`, or others.
- **Trust languages** that define concepts like delegation or identity relationships.

To make the model navigable and interpretable, a [`manifest`](/openprotocolspec/2025-04-05/base-protcol/authstar-models/manifest-blob/) is required. The manifest organizes the objects by language type and provides the necessary metadata to understand how each blob should be processed.
