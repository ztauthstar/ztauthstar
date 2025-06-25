---
title: Manifest
cascade:
  type: docs
weight: 1000
prev: /openprotocolspec/2025-04-05
next: /openprotocolspec/2025-04-05/architecture
math: true
---

**ZTAuth*** defines an authorization model and a trust model — collectively referred to as `auth* models` — through a protocol-level specification that is:

- **Transferable**
- **Versionable**
- **Immutable**
- **Resilient**

This protocol is designed in alignment with Zero Trust principles, supporting the creation of security models that are identity-aware, context-sensitive, and enforce least privilege by default.

**ZTAuth*** does not aim to replace existing standards. Rather, it defines an open protocol specification that builds upon them, addressing their limitations through a dedicated layer for consistent and fine-grained authorization for both human and non-human identities.

> [!DEFINITION]
> **ZTAuth\*** is a Zero Trust–compliant protocol that provides secure, identity-driven access to resources, enforcing least privilege at the application edge. Designed for eventual consistency, it maintains the security state during network disruptions and automatically synchronizes when connectivity is restored.

## Context and Motivation

The growth of **AI agents** brings new business opportunities, but also new **security** and **authorization** challenges. Agents are not simple scripts. They are **distributed systems** that can act, communicate, and make decisions on their own.

This highlights a long-standing issue: in a **distributed world**, traditional **authentication** and **authorization** are not enough.

We already see this in **critical systems**, such as **public service integration**, where **delegation** and **central authorization** are still not standardized.

Until now, this problem has often been hidden by running systems inside a single environment, such as a **cloud** or **private data center**, or by establishing implicit trust through **certificate-based federation** between entities — an approach that introduces its own security risks, such as key compromise, uncontrolled trust propagation, and limited auditability.

The challenge is shared with **digital sovereignty** and **distributed architectures**, but **AI agents** make the need for a new **authorization and trust model** much more urgent.

Infrastructure is moving towards **Zero Trust security** using models like **Zero Trust Network Access (ZTNA)**.  

The **application layer** must follow this evolution — and **ZTAuth*** is designed to be the missing piece.

## Human vs Non Human Identities

Human identity is already well-managed using [OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html) and [OAuth 2.0](https://datatracker.ietf.org/doc/html/rfc6749).

Now, there is a growing need to manage identities for intelligent systems — such as **machines** and **agents** — which will likely be addressed using standards like [Workload Identity in Multi System Environments (WIMSE)](https://datatracker.ietf.org/wg/wimse/).

**ZTAuth*** relies on these existing standards, but extends them with a **unified**, **interoperable** authorization model that is shared by both **human** and **non-human** identities in a consistent way.

## Identities and Actions

When a human authenticates, the purpose is often not to interact manually with the system, but to authorize a software component — such as an application or service — to act **on their behalf**. The authentication process enables the system to verify the user's identity and establish a trust relationship that authorizes **impersonated execution** within a constrained identity context derived from the human identity.

In some environments, this may involve **impersonation**, where the delegated component temporarily assumes the user's identity. In others, the component retains its own identity but operates under an explicitly authorized and verifiable delegation model.

### Distributed Execution Challenges

System operations are often not executed within a single application. Instead, actions may:

- Span multiple services or components,
- Take longer than the validity period of the original authentication token,
- Involve components that cannot access or forward the original token due to security or logging constraints.

Propagating the user’s token across a distributed system risks violating fundamental security principles. For example, in a workflow involving a message broker, it becomes unclear how the identity token should be safely transmitted or validated across services.

### Delegation Model

To address this, each participating component in the system should:

1. Authenticate using its own identity, typically a non-human identity (e.g., service, machine, or agent).
2. Request authorization to perform actions on behalf of the human (target identity).
3. Establish a delegated authorization context that:
   - Verifies the non-human identity is permitted to represent the human identity,
   - Ensures the resulting authorization context reflects the permissions and constraints of the original human identity.

This model requires an explicit and verifiable mechanism for impersonation and delegation. It is a structured approach where authorization is granted and enforced according to defined rules and trust relationships.

### Trust Models and Authorization Contexts

To support this, the system must implement trust models capable of validating that a non-human identity is authorized to elevate its execution context to that of the target identity.

The authorization model of the target identity must be constructed to reflect the permissions that would apply **if the action were executed directly by the target identity**. This logic must be preserved across execution boundaries and consistently enforced, regardless of the identity performing the operation.

This introduces requirements for authorization models to be:

- Transferable across systems,
- Versioned to ensure consistency,
- Immutable to guarantee integrity,
- Resilient to support reliable impersonation and delegation in distributed environments.

### Non-Human as Target Identity

If the target identity itself is non-human — such as an autonomous agent or machine — the same principles apply. The identity must be authenticated and explicitly authorized to act within the intended scope, either independently or on behalf of another identity.

### Role of ZTAuth*

Today, identity and access standards [OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html), [OAuth 2.0](https://datatracker.ietf.org/doc/html/rfc6749) and [Workload Identity in Multi System Environments (WIMSE)](https://datatracker.ietf.org/wg/wimse/) primarily focus on generating tokens that represent an identity (human or non human), or a relationship between identities — such as delegation via scopes or claims.

However, these standards **do not define a complete ecosystem** for:

- Modeling **impersonation** and **delegation** across distributed systems,
- Defining and enforcing **Trust Models** that govern which identities can act on behalf of others,
- Creating and propagating **Authorization Contexts** tied to the target identity.

This is the gap that **ZTAuth*** fills.

**ZTAuth*** introduces a structured framework for defining and enforcing:

- An **impersonation** and **delegation model**, where identities (human or non-human) can securely act on behalf of others,
- A **trust model**, where systems can verify whether such impersonation/delegation is permitted,
- A consistent **authorization context**, which reproduces the policies, permissions, and constraints of the original target identity — even when execution happens elsewhere.

In doing so, **ZTAuth*** enables secure, auditable delegation in distributed environments, where traditional identity propagation is either impractical or insecure.

> It does not replace existing standards, but extends them with a dedicated layer focused on **fine-grained, verifiable, and transferable authorization**, designed to support both **Zero Trust architectures** and **autonomous execution models** such as agents, workflows, and services.

## Evolution of Data Spaces and Orchestration

In federated ecosystems such as Data Spaces, organizations must enforce **precise and verifiable control** over who can access data and how it is used. Traditional approaches often rely on point-to-point agreements or infrastructure-level restrictions, which are difficult to scale or audit across multiple participants.

**ZTAuth*** enables enforcement of **data access policies at the source**, ensuring that authorization decisions reflect the originator’s intent, regardless of where the request is executed. This enhances data control, transparency, and trust in multi-party environments.

As systems evolve toward **autonomous, distributed architectures** — including AI agents, event-driven pipelines, and microservice-based applications — there is a growing need to move beyond simple service integration.

What is required is **orchestration that is aware of authorization**, where workflows are governed not just by system logic but by identity, trust, and policy.

**ZTAuth*** enables this shift by introducing a unified model for **identity-driven orchestration**. It makes it possible to define **who can initiate, modify, or propagate** a workflow, based on **delegated authorization and verifiable trust relationships**.

This represents a foundational step toward **secure-by-design orchestration** in distributed environments — where actions are authorized contextually, policies are portable and auditable, and both human and non-human identities are treated consistently.
