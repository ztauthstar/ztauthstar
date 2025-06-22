---
title: Manifest
cascade:
  type: docs
weight: 3203
prev: /openprotocolspec/2025-04-05/base-protcol/authstar-models/object-model
next: /openprotocolspec/2025-04-05/base-protcol/zts
---

An `Auth*` model is associagted to a specific [`ledger`](/openprotocolspec/2025-04-05/base-protcol/authstar-models/ledgers), moreover it is linked to a specific runtime, which includes the `engine` and the `language` to be used to interpret and evaluate the model. For this reason, a **manifest** must be provided to describe the model requirements.

> [!IMPORTANT]
> This document uses an `Auth*` model as an example.

The manifest includes metadata and defines the runtime and other settings for each model.

## Metadata

A manifest has to include metadata such as `name`, `description`, `author`, and `license`.

```json
{
    "metadata": {
        "name": "oms-model",
        "description": "A zero trust auth* model to manage orders.",
        "author": "Nitro Agility Srl",
        "license": "Apache-2.0"
    }
}
```

## Partitions

Models are designed to contain `blobs`, and each `model` can be divided into `partitions`. The `root` partition, defined as `/`, is used for all paths where no specific partition is provided.

```json
{
    "metadata": {
        "name": "oms-model",
        "description": "A zero trust auth* model to manage orders.",
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

Each `partition` has its own settings, such as runtime and schema.  
The runtime has to include the language, its version, and the engine to be used.

```json
{
    "metadata": {
        "name": "oms-model",
        "description": "A zero trust auth* model to manage orders.",
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
