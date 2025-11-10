---
title: Domains and Zones
cascade:
  type: docs
draft: true
weight: 3100
prev: /openprotocolspec/2025-04-05/base-protcol
next: /openprotocolspec/2025-04-05/base-protcol/authstar-models
---

**ZTAuth*** enables the definition of trust domains and zones, and introduces a URI-based identifier called a **ZTID** to uniquely reference resources within those domains and zones.

## ZTDomain

A `ZTDomain` defines the root of trust within a ZTAuth* architecture. It may represent an individual, an organization, or an autonomous system.

A valid `ZTDomain` is expressed as the **authority component** of a URI using the `ztauth` scheme, and **MUST** conform to the following constraints:

- The authority **MUST include a non-empty host component**.
- The authority **MUST NOT include a userinfo component** (e.g., `user@domain` is invalid).
- The authority **MUST NOT include a port number** (e.g., `domain:443` is invalid).
- The host component **MUST consist exclusively of lowercase ASCII letters (`a–z`), digits (`0–9`), dots (`.`), hyphens (`-`), and underscores (`_`)**.
- The host component **MUST NOT contain uppercase characters**.
- The host component **MUST NOT contain percent-encoded characters** (e.g., `%20`, `%2F`).
- The `ZTDomain` identifier **MUST be normalized** prior to comparison. No case folding, decoding, or whitespace trimming **MAY** be applied during normalization.

## ZTZone

A `ZTZone` defines a logical trust boundary within a `ZTDomain`. It may represent a specific area of trust such as a network segment, geographic region, or an isolated set of resources under common control.

A valid `ZTZone` identifier **MUST** satisfy the following constraints:

- The identifier **MUST be a numeric value**.
- The value **MUST be in the range `100000000000` to `999999999999`** (inclusive).
- The identifier **MUST be unique within its corresponding `ZTDomain`**.

## ZTID

`ZTID` is a URI-based identifier used to uniquely reference resources within a ZTAuth* architecture. It follows the general structure:

```plaintext
ztauth://<trust-domain>/<trusted-zone>/<resource-path>
```

A valid `ZTID` **MUST** consist of the following components:

- A valid **trust domain** (see Section: ZTDomain).
- A valid **trusted zone** (see Section: ZTZone).
- A valid **resource path**, defined as the remaining portion of the URI path following the trusted zone.

The **resource path** component **MUST** satisfy the following constraints:

- The path **MUST NOT** be empty.
- The path **MUST NOT** contain relative segments (i.e., `.` or `..`).
- The path **MUST NOT** end with a trailing slash (`/`).
- Each path segment **MUST** consist solely of ASCII letters (`A–Z`, `a–z`), digits (`0–9`), dots (`.`), hyphens (`-`), and underscores (`_`).
- The path **MUST NOT** contain percent-encoded characters.

Example:

```plaintext
ztauth://core-platform.internal/273165098782/ledgers/corporate-policies
```
