---
title: Decision Points
cascade:
  type: docs
weight: 3500
prev: /openprotocolspec/2025-04-05/base-protcol/tts/tx-token
next: /openprotocolspec/2025-04-05/base-protcol/decision-points/authorization-request
---

In `ZTAuth*`, authorization decisions are made through the interaction of two core components:

- The **Policy Enforcement Point (PEP)**, which intercepts access requests and enforces the decision.
- The **Policy Decision Point (PDP)**, which evaluates the request against applicable `auth* models` and returns a decision.

Communication between the PEP and PDP **MUST** conform to the [OpenID AuthZEN](https://openid.net/specs/authorization-api-1_0-01.html) specification, ensuring standardized interfaces for request submission, decision retrieval, and context propagation.

This separation of enforcement and decision logic enables support for both **centralized** and **proximity-based** deployment models, and aligns with Zero Trust principles by maintaining context-aware evaluation at runtime.
