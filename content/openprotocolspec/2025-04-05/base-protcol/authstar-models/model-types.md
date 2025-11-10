---
title: Model Types
cascade:
  type: docs
draft: true
weight: 3202
prev: /openprotocolspec/2025-04-05/base-protcol/authstar-models/ledgers
next: /openprotocolspec/2025-04-05/base-protcol/object-types
---

A `ZTAuth*` **Model** is a structured representation of either **authorization** or **trust** semantics within a defined context.

Each model belongs to one of two primary categories:

- **AuthZ Models**: Define the rules and decisions that determine access to resources.
- **Trust Models**: Define how trust is established, delegated, or elevated across identities and systems.

A model consists of a collection of **Objects** that express rules, constraints, and relationships relevant to its category. Models are designed to be **extensible**, supporting multiple policy languages and evaluation strategies.

Each model may define one or more **types**, serving specific roles within its category:

- **Policy**: Specifies access control rules — determining *who* is authorized to perform *which actions*. Policies may be written in various languages (e.g., `cedar`, `rego`, or others).
- **Trusted Elevation**: Describes how an identity may be elevated from one **authorization context** to another under controlled conditions.
- **Trusted Delegation**: Describes how one identity may act **on behalf of another**, subject to constraints defined within the model.

Each model type **MAY** be further specialized and **MAY** include:

- a **Policy Language**, indicating the syntax and semantics of the policy definitions.
- an **Evaluation Model**, specifying how decisions are computed at runtime.
