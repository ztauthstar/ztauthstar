---
title: Trust Chain
cascade:
  type: docs
weight: 3504
prev: /openprotocolspec/2025-04-05/base-protcol/decision-points/trust-level
next: /openprotocolspec/2025-04-05/appendix-a-list-of-specs
---

The **ZTAuth\*** protocol introduces the concept of a **Trust Chain**, which represents the runtime flow of a distributed transaction. A Trust Chain consists of one or more **Chain Rings**.

A **Chain Ring** is the atomic authorization unit within a Trust Chain. It represents a single point of trust in the distributed transaction, a point where an authorization decision is made between the Policy Enforcement Point (PEP) and the Policy Decision Point (PDP) to either continue or terminate the operation. Each ring reflects an isolated decision boundary, contributing to the integrity and traceability of the overall transaction flow.

To better illustrate this concept, consider the following examples:

- **Single Chain Ring**: In a simple transaction, such as a REST API receiving a request, processing it, and returning a response, the entire trust evaluation occurs at a single point, the API gateway or backend service. This forms a single Chain Ring where the decision to authorize or reject the request is made.
- **Publisher and Consumer with Apache Kafka**: In a more distributed scenario, a producer publishes a message to a Kafka topic, and a consumer later retrieves and processes that message. The Trust Chain in this case includes at least two Chain Rings: one when the producer authorizes the emission of the message, and another when the consumer authorizes its processing.
- **Agentic AI Systems**: In environments where autonomous agents interact with tools (e.g., via the MCP protocol) or with other agents (via an A2A protocol), each interaction constitutes a separate Chain Ring. Every such communication involves an authorization decision — determining whether the agent is permitted to invoke a tool or communicate with another agent — thus forming a distributed, multi-ring Trust Chain.
