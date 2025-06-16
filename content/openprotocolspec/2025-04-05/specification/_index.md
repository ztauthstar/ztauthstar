---
title: Specification
cascade:
  type: docs
weight: 1000
prev: /openprotocolspec/2025-04-05/
next: /openprotocolspec/2025-04-05/architecture
---

**ZTAuth*** redefines authentication (AuthN) and authorization (AuthZ) with models that are:

- **Transferable**, **Versionable**, **Immutable**, and **Resilient**.
- Enable **trusted models** and Zero Trust security.

This specification defines several foundational concepts, as detailed below.

## ZTDomain

A `ZTDomain` is a trust domain which defines the trust root of a zero trust domain. It can represents an individual, organization, or system.

A valid trust domain is defined as the **authority component** of a URI using the `ztauth` scheme, and **MUST** comply with the following constraints. The authority follows the standard URI format:

- The authority **MUST include a non-empty host component**.
- The authority **MUST NOT include a userinfo component** (e.g., `user@domain` is invalid).
- The authority **MUST NOT include a port number** (e.g., `domain:443` is invalid).
- The host component **MUST consist only of lowercase ASCII letters (`a–z`), digits (`0–9`), dots (`.`), dashes (`-`), and underscores (`_`)**.
- The host component **MUST NOT contain uppercase characters**.
- The host component **MUST NOT contain percent-encoded characters** (e.g., `%20`, `%2F`).
- The trust domain identifier **MUST be normalized** prior to comparison (e.g., no case folding, decoding, or trimming).

## ZTZone

A `ZTZone` is a trust zone that defines a logical boundary within a Trust Domain.  
It may represent a specific area of trust, such as a network segment, region, or an isolated group of resources.

A valid trusted zone identifier **MUST** meet the following constraints:

- The zone identifier **MUST be a numeric value**.
- The value **MUST be between `100000000000` and `999999999999`** (inclusive).
- The identifier **MUST be unique within the same Trust Domain**.

## ZTID

A `ZTID` is a URI-based identifier for resources in a Zero Trust system. It follows the format:

```plaintext
ztauth://<trust-domain>/<trusted-zone>/<resource-path>
```

- A valid **trust domain**
- A valid **trusted zone**
- The **resource path** is the remaining part of the URI path (i.e., all segments after the trusted zone). It **MUST** meet the following constraints:
  - The path **MUST NOT** be empty
  - The path **MUST NOT** contain relative segments (`.` or `..`)
  - The path **MUST NOT** end with a slash (`/`)
  - Each segment **MUST** consist only of ASCII letters, digits, dots (`.`), dashes (`-`), and underscores (`_`)
  - The path **MUST NOT** contain percent-encoded characters

Example:

```plaintext
ztauth://core-platform.internal/273165098782/ledgers/corporate-compliance
```
