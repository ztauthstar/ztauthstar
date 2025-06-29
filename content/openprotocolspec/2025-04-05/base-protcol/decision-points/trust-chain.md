---
title: Trust Chain
cascade:
  type: docs
weight: 3504
prev: /openprotocolspec/2025-04-05/base-protcol/decision-points/trust-level
next: /openprotocolspec/2025-04-05/appendix-a-list-of-specs
---

### Trust Chain and Chain Rings

The **ZTAuth\*** protocol introduces the concept of a **Trust Chain**, which represents the runtime flow of a distributed transaction. A `Trust Chain` consists of one or more **Chain Rings**.

A `Chain Ring` is the atomic authorization unit within a `Trust Chain`. It represents a single point of trust in the distributed transaction,  a point where an authorization decision is made between the Policy Enforcement Point (PEP) and the Policy Decision Point (PDP) to either continue or terminate the operation. Each ring reflects an isolated decision boundary, contributing to the integrity and traceability of the overall transaction flow.

To better illustrate this concept, consider the following examples:

- **Single Chain Ring**: In a simple transaction, such as a REST API receiving a request, processing it, and returning a response, the entire trust evaluation occurs at a single point,  the API gateway or backend service. This forms a single Chain Ring where the decision to authorize or reject the request is made.

- **Publisher and Consumer with Apache Kafka**: In a more distributed scenario, a producer publishes a message to a Kafka topic, and a consumer later retrieves and processes that message. The Trust Chain in this case includes at least two Chain Rings: one when the producer authorizes the emission of the message, and another when the consumer authorizes its processing.

- **Agentic AI Systems**: In environments where autonomous agents interact with tools (e.g., via the [MCP](https://modelcontextprotocol.io/specification) protocol) or with other agents (via an [A2A](https://a2aproject.github.io/A2A/latest/specification/#65-part-union-type) protocol), each interaction constitutes a separate Chain Ring. Every such communication involves an authorization decision,  determining whether the agent is permitted to invoke a tool or communicate with another agent,  thus forming a distributed, multi-ring Trust Chain.

### Trust Chain Ring Structure

A **Trust Chain Ring** includes the following key components:

- **Subject Trust Proof**: An assertion that establishes the identity and trustworthiness of the subject (i.e., the original initiator of the transaction). For example:
  - In a human-initiated request, this might be a JWT access token issued via OAuth 2.0.
  - For workload-initiated flows, it may be a token issued via WIMSE or SPIFFE.
  - In asynchronous systems (e.g., Kafka), it may be a signed message that cryptographically binds the request to the original subject, even in the absence of the original token.
- **Actor Identity**: The identity of the current workload or component responsible for handling the request at this step in the flow.
- **Authorization Request**: The input authorization request, including details such as requested scope and action.
- **Zero Trust Context**: A context constructed at runtime by integrating external sources of information,  such as a Policy Information Point (PIP),  to enrich the decision with environment-specific and risk-aware data.

### Evaluation Flow

The Policy Enforcement Point (PEP) **MUST** construct a valid Trust Chain Ring in order to request an authorization decision from the Policy Decision Point (PDP). To do so, the PEP **MUST** contact the **Transaction Token Service**, requesting a `Txn Token` scoped to the operation, and including both the **Subject Trust Proof** and the **Actor Identity**.

The Transaction Token Service **MUST** issue a `Txn Token` only if a valid chain of trust can be established between the subject and the actor, in accordance with the configured policies. Once the token is issued, the PEP proceeds to send the full authorization request to the PDP for evaluation.

The resulting decision **MUST** reflect the trust context derived from the constructed Chain Ring and respect the Zero Trust principle of least privilege.
