---
title: Manifest
cascade:
  type: docs
weight: 1000
prev: /openprotocolspec/2025-04-05
next: /openprotocolspec/2025-04-05/architecture
math: true
---

## Problem Statement

We live in an **identity-centric world**, where access to systems and resources is granted based on **who** or **what you are**. To prove identity or access rights, most systems rely on **tokens**, portable proofs issued by a trusted authority.

Examples include `OAuth 2.0` access tokens (for authorization), `SAML` assertions and `JWTs` (for authentication or identity claims), and `API keys`.  

These tokens are presented to workloads to request access.

However, once the token is received, there is **no standard protocol** to guarantee that:

- the token is actually validated  
- its scopes, roles, or consent are enforced  
- the workload is trusted to act on behalf of the subject  
- the action is logged or can be audited  
- delegation rules are enforced or even known

In practice, this means that enforcement happens inside the application code, often inconsistently and without external visibility.

> OAuth is a typical example: it issues a valid token, but it does not define what must happen after the token is delivered.

This model leads to **security gaps**, **lack of governance**, and **risk of silent delegation**.

**ZTAuth\*** addresses this gap by introducing an authorization protocol that governs runtime enforcement, validates mutual trust between identities and workloads, and ensures consistent handling of delegation and consent — all in line with Zero Trust principles.

> **Note:**  
> The problem space can be summarized as:
>
> ```
> [Token Issued] → [Token Delivered] → [ ??? ] ← ZTAuth* governs this part
> ```
>
> Traditional token systems stop at delivery.  
> ZTAuth\* starts where they end.

## Human vs Non-Human Identities

Most identity systems focus on human users. Modern architectures also involve non-human actors such as services, agents, and machines.

Standards like [OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html) and [OAuth 2.0](https://datatracker.ietf.org/doc/html/rfc6749) cover human identities well. Managing identities for machines and agents is still evolving, with efforts like [WIMSE](https://datatracker.ietf.org/wg/wimse/) addressing this space.

## Foundational Concepts

ZTAuth* is built on four core pillars that define how authorization is governed, delegated, and enforced across distributed systems.  
These pillars provide the foundation for a consistent and secure authorization model, aligned with Zero Trust principles.

### Policy Governance

Authorization logic is often hardcoded inside applications, making it difficult to update, audit, or share.  
ZTAuth* introduces a centralized governance layer for policy management.  
This allows external control over how policies are applied and enables integration with risk and compliance processes.

### Workload Governance

Tokens are usually processed by the workload receiving the request, without guarantees on validation or trust.  
ZTAuth* allows workloads to be grouped into **security groups** with defined **trust levels**, and controls which workloads can act **on behalf of** a subject.  
This enables secure and auditable workload-level authorization.

### Security Model

ZTAuth* builds a complete **authorization context** using both the subject and workload identities.  
Trust and policy data are stored in a **Git-like structure**, ensuring immutability, versioning, and portability.  
This context can be materialized as a **Transaction Token (TxToken)**, issued by a Transaction Token Service working with a Policy Decision Point.

### Delegation-First Model

Delegation is a primary element in ZTAuth*, not a secondary feature.  
The protocol supports **explicit delegation** using verifiable consent from the subject.  
Mechanisms like **Trust Elevation** and **Trust Delegation** allow controlled access to different authorization contexts in a secure and auditable way.
