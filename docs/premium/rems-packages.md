---
sidebar_position: 13
unlisted: true
---

# REMS - Packages

Package-level NDC mappings for active REMS programs.

## Overview

Links each active REMS program to FDA NDCs via application number, using `int_fda_rems__ndcs_by_application`. One row per REMS program and package NDC combination.

## Schema

| Column Name | Description | Tests |
|------------|-------------|-------|
| `rems_id` | A unique key used to identify each REMS program. | `not_null` |
| `rems_name` | The name of the REMS program. | |
| `ndc11` | Normalized 11-digit NDC from the FDA NDC Directory. | `not_null` |
| `ndc` | Package-level NDC code from the FDA NDC Directory. | |
| `application_type` | The type of marketing approval (NDA, BLA, or ANDA). | |
| `application_number` | FDA application number used to link REMS products to NDCs. | |


## Use Cases

- Determining which NDCs fall under an active REMS program
- Linking REMS requirements to specific drug packages
- Joining REMS programs to package-level pricing or packaging data
