---
title: Manifest Blob
cascade:
  type: docs
weight: 3204
prev: /openprotocolspec/2025-04-05/base-protcol/authstar-models/object-types
next: /openprotocolspec/2025-04-05/base-protcol/authstar-models/language-blob
---

An `auth*` model is associated with a specific [`ledger`](/openprotocolspec/2025-04-05/base-protcol/authstar-models/ledgers) and is bound to a defined **runtime**, which includes both the **engine** and **policy language** used for interpretation and evaluation.

To declare the runtime requirements and configuration, each model **MUST** include a single **manifest**.

> [!IMPORTANT]
> A valid `auth*` model **MUST** include exactly one manifest. The manifest is required for the model to be considered valid and operational within the `ZTAuth*` protocol.

The `manifest` is represented as a `blob` [`object`](/openprotocolspec/2025-04-05/base-protcol/authstar-models/object-types/) and contains both **metadata** and **runtime configuration** for the model.

### Metadata

The manifest **MUST** include the following metadata fields:

- `name`: A human-readable identifier for the model.
- `description`: A brief description of the model's purpose.
- `author`: The name or identifier of the model's creator or maintainer.
- `license`: A string indicating the applicable license for the model content.

```json
{
    "metadata": {
        "name": "oms-model",
        "description": "A zero trust auth* model to manage the corporate policies.",
        "author": "Nitro Agility Srl",
        "license": "Apache-2.0"
    }
}
```

## Partitions

An `auth*` model consists of one or more `blobs`, which are organized into logical units called **partitions**.

Partitions are used to group and isolate related components of a model. Each partition defines a namespace within the model, and paths are resolved relative to the partition they belong to.

The **root partition**, represented as `/`, serves as the default namespace. It **MUST** be used for all paths that do not explicitly belong to a named partition.

> If no partition is specified for a given blob, it is assumed to belong to the root partition (`/`).

```json
{
    "metadata": {
        "name": "oms-model",
        "description": "A zero trust auth* model to manage the corporate policies.",
        "author": "Nitro Agility Srl",
        "license": "Apache-2.0"
    },
    "partitions": {
        "/": {
        }
    }
}
```

## Runtimes

Each `partition` within an `auth*` model **MAY** define its own runtime configuration.  
A runtime specifies how the data in that partition is to be interpreted and evaluated.

The runtime configuration **MUST** include the following fields:

- **Language**: The policy or trust language used (e.g., `rego`, `cedar`) along with its version.
- **Engine**: The runtime engine responsible for evaluating the model within the given partition.

> If no runtime is explicitly defined for a partition, the system **MUST** fallback to the default runtime defined in the model’s manifest.

```json
{
    "metadata": {
        "name": "oms-model",
        "description": "A zero trust auth* model to manage the corporate policies.",
        "author": "Nitro Agility Srl",
        "license": "Apache-2.0"
    },
    "runtimes": {
        "cedar[0.0+]": {
            "language": {
                "name": "cedar",
                "version": "0.0+"
            },
            "engine": {
                "name": "permguard",
                "version": "0.0+",
                "distribution": "community"
            }
        }
    },
    "partitions": {
        "/": {
            "runtime": "cedar[0.0+]",
            "schema": false
        }
    }
}
```
