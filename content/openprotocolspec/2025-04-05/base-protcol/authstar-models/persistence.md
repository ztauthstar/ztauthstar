---
title: Persistence
cascade:
  type: docs
weight: 3202
prev: /openprotocolspec/2025-04-05/authstarmodels/
next: /openprotocolspec/2025-04-05/authstarmodels/feature
---

An `Auth*` model must be self-consistent. All model data should be persisted and kept in a consistent state. The data are represented as objects, following a Git-like object model.

> [!IMPORTANT]
> Using Git directly might not be suitable for production environments.  
Git allows storing any type of file and does not enforce file structure or content rules.  
Because of this, a custom Git-like object model is required—one that only allows valid `Auth*` models and rejects invalid ones.

Three types of objects are required:

- **Commit**: Represents a snapshot of the `Auth*` model. Each commit is linked to one or more trees and should point to the previous commit, unless it is the first.
- **Tree**: Represents a collection of data objects that belong to a specific structure or group.
- **Blob**: Contains domain-specific data, such as a policy or other valid element within the model.
