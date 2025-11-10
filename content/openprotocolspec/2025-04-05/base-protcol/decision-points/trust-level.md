---
title: Trust Level
cascade:
  type: docs
draft: true
weight: 3503
prev: /openprotocolspec/2025-04-05/base-protcol/decision-points/authz-check
next: /openprotocolspec/2025-04-05/base-protcol/decision-points/trust-chain
---

In the **ZTAuth\*** protocol, identities may be organized into **Security Groups**, specifically referred to as **Trust Levels**. These groupings provide a structured mechanism for categorizing identities based on attributes such as trustworthiness, operational capabilities, or assigned roles within the system.

`Trust Levels` enable flexible and scalable authorization policies. They support adaptation to a wide range of organizational models, regulatory requirements, and dynamic trust assessments. For example, an organization may define which groups are authorized to perform specific classes of actions, either in compliance with internal policies, external regulations, or in response to operational signals (e.g., marking an identity as compromised or untrusted).

This grouping mechanism is not static. Membership in a group or level may change over time as the system re-evaluates the posture or context of the identity.

As an illustrative example, consider a network-connected printer. It has a workload identity associated with it, and be assigned to a `trust level` that is permitted to print only non-sensitive documents. Access may further be restricted based on additional constraints such as time of day, physical location, or document classification level.
