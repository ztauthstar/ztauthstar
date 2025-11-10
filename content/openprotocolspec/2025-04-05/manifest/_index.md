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

However, not all communication flows are token-based. While many interactions between services use tokens, especially in synchronous API calls - other patterns such as **asynchronous messaging**, **event streaming**, or **batch processing** may not support token propagation.

In these cases, systems often rely on **secure channels**, **pre-established trust**, or **inferred identity**, but without a shared protocol to verify or audit authorization decisions.

Even when tokens are used, there is **no standard protocol** to guarantee that:

- the token is actually validated  
- its scopes, roles, or consent are enforced  
- the workload is trusted to act on behalf of the subject  
- the action is logged or can be audited  
- delegation rules are enforced or even known

In practice, this means that enforcement happens inside the application code, often inconsistently and without external visibility.

> OAuth is a typical example: it issues a valid token, and while it recommends that the resource server validates the token, it does not define what must happen after the token is delivered, including how scopes are enforced, how delegation is handled, or how access is audited.

This model leads to **security gaps**, **lack of enforcement guarantees**, and **risk of silent delegation**.

**ZTAuth\*** addresses this gap by introducing an authorization protocol that governs runtime enforcement, validates mutual trust between identities and workloads, and ensures consistent handling of delegation and consent — all in line with Zero Trust principles.

> **Note:**  
> The problem space can be summarized as:
>
> ```
> [Token Issued] → [Token Delivered] → [ ??? ] ← ZTAuth* governs this part
> ```
>
> Traditional token systems stop at delivery.  
> **ZTAuth\*** starts where they end.

## Human vs Non-Human Identities

Most identity systems focus on human users. Modern architectures also involve non-human actors such as services, agents, and machines.

Standards like [OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html) and [OAuth 2.0](https://datatracker.ietf.org/doc/html/rfc6749) cover human identities well. Managing identities for machines and agents is still evolving, with efforts like [WIMSE](https://datatracker.ietf.org/wg/wimse/) addressing this space.

## Foundational Concepts

**ZTAuth\*** is built on four core pillars that define how authorization is governed, delegated, and enforced across distributed systems. These pillars provide the foundation for a consistent and secure authorization model, aligned with `Zero Trust principles`.

### Policy Governance

Authorization logic is often hardcoded inside applications, making it difficult to control how access decisions are made or to track them for auditing. **ZTAuth\*** separates policy from application code by introducing a **policy layer** — which can be **centralized or decentralized** — for defining authorization rules.  

Policies are stored in a **Git-like structure**, ensuring **immutability**, **versioning**, **correctness**, and **portability**. This enables consistent access control and supports integration with auditing, risk management, and compliance processes.  

**Enforcement happens in a distributed way**, closely paired with the policy store.

### Workload Governance

Tokens are usually processed by the workload receiving the request, but there is no protocol-level guarantee that the token is validated or that the workload is trusted. **ZTAuth\*** makes validation an integrated part of the authorization process by defining which workloads are allowed to process requests.

Workloads can be grouped into **security groups** with assigned [**Trust Levels**](/openprotocolspec/2025-04-05/base-protcol/decision-points/trust-level), and the protocol controls which of them can act **on behalf of** a subject. This enables secure and auditable authorization decisions at the workload level.

### Zero Trust Security Model

**ZTAuth\*** builds a complete **Authorization Request Context** by combining both the **subject identity** and the **workload identity**.  
This dual-identity model allows authorization decisions to consider not only *who* initiated an action, but also *what* is executing it — ensuring that trust is evaluated across both human and machine boundaries.

The **Authorization Request Context** is processed by a **Policy Decision Point (PDP)**, which evaluates the request under active **Trust Statements**.

**ZTAuth\*** also supports [**Trust Elevation**](/openprotocolspec/2025-04-05/base-protcol/decision-points/trust-elevation), a controlled process that allows a workload to operate within the **authorization context of another identity** — provided that all required **Trust Level conditions** are met.  
This typically occurs when a service needs to perform an operation **on behalf of** a user or another workload, but only after the **target context’s policy** explicitly permits such elevation under verified conditions.

Each **Trust Elevation** is evaluated against policy-defined rules, which may include **context validation**, **attestation checks**, or **proof of consent**.  
This ensures that elevated privileges are always **justified, auditable, and reversible**, maintaining full alignment with **Zero Trust principles** and enabling **dynamic, verifiable delegation** across distributed workloads.

### Delegation-First Model

**Delegation** is a core feature in ZTAuth\*, not an optional add-on. By explicitly modeling both the subject and the workload in the **Authorization Request Context**, ZTAuth\* naturally supports **on-behalf-of execution**.

Delegation is made explicit and verifiable through [**Trust Delegation**](/openprotocolspec/2025-04-05/base-protcol/decision-points/trust-delegation), where a subject can authorize another identity, such as a workload or service, to act within a specific scope. Delegation requires proof of subject consent and is enforced by policy at runtime.

This model ensures that all delegated actions are controlled, traceable, and aligned with the Zero Trust principle of least privilege.
