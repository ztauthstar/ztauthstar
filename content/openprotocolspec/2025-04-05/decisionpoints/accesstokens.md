---
title: Access tokens
cascade:
  type: docs
weight: 60
prev: /openprotocolspec/2025-04-05/decisionpoints
next: /openprotocolspec/2025-04-05/decisionpoints/portablemodels
---

The Policy Decision Point (PDP) receives as input a **Claimed Scope Intent Token (CSIT)**.

- **Claimed Scope Intent Token (CSIT)**  
  Represents what the requester *intends* to do and under which scope.  
  For example: *"I want to read the bank statement of my current account."*

- **Scoped Access Token (SAT)**  
  Represents what the requester is actually *authorized* to do, based on verified identity, attributes, and policy evaluation.  
  It is issued by an authority, such as a Policy Decision Point (PDP) or control plane.
