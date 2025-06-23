---
title: Models
cascade:
  type: docs
weight: 3202
prev: /openprotocolspec/2025-04-05/base-protcol/authstar-models/ledgers
next: /openprotocolspec/2025-04-05/base-protcol/object-types
---

## ZTAuth\* Models

A **ZTAuth\*** `Model` is a structured representation of **Authorization** and **Trust** concepts.

There are several types of models:

- **Policy**: Defines the rules that determine who is authorized to do what. Policies can be written in different languages such as `cedar`, `rego`, or others.
- **Trusted Elevation**: Is the process of elevating one identity from one **authorization context** to another. These models can be extended with custom languages and stored in the model.
- **Trusted Delegation**: Is the process of allowing one identity to act **on behalf of another**. These models can also be extended with custom languages and stored in the model.

Each model type can be further **specialized**, and can include a **policy language** and an **evaluation model** to define how decisions are made.
