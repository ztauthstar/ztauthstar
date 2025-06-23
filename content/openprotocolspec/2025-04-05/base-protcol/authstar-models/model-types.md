---
title: Model Types
cascade:
  type: docs
weight: 3202
prev: /openprotocolspec/2025-04-05/base-protcol/authstar-models/ledgers
next: /openprotocolspec/2025-04-05/base-protcol/object-types
---

A **ZTAuth\*** `Model` is a structured representation of **authorization** and **trust** concepts.

A model is a collection of **objects** that define the rules and relationships governing access and trust within a specific context. It is designed to be **extensible**, allowing for the inclusion of multiple policy languages and evaluation models.

A model can have different **types**, each serving a specific purpose in authorization and trust management:

- **Policy**: Defines the rules that determine *who* is authorized to do *what*. Policies can be written in various languages, such as `cedar`, `rego`, or others.

- **Trusted Elevation**: Describes the process of elevating an identity from one **authorization context** to another. These models can include custom policy languages and be stored within the model.

- **Trusted Delegation**: Describes how one identity can act **on behalf of another** under specific conditions. These models can also include custom policy languages and be stored within the model.

Each model type can be further **specialized**, and may include a **policy language** and an **evaluation model** to define how decisions are made at runtime.
