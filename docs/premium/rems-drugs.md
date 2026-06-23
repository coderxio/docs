---
sidebar_position: 14
unlisted: true
---

# REMS - Drugs

RxNorm drug mappings for active REMS programs.

## Overview

Links each active REMS program to RxNorm drug products (`drug_id`) by resolving package NDCs through `int_packages`. One row per REMS program and drug_id combination.

## Schema

| Column Name | Description | Tests |
|------------|-------------|-------|
| `rems_id` | A unique key used to identify each REMS program. | `not_null` |
| `rems_name` | The name of the REMS program. | |
| `drug_id` | RxNorm RXCUI for the drug product linked via package NDC. Can be joined to the drugs model on drug_id. | `not_null` |
| `clinical_drug_id` | RxNorm RXCUI of the related clinical product. For brand drugs, links to the generic equivalent. Can be joined to the drugs model on clinical_drug_id. | |
| `drug_name` | The RxNorm name for the linked drug product. | |
| `clinical_drug_name` | The name of the related clinical product. | |
| `is_brand` | True when the linked drug_id is a brand product. | |


## Use Cases

- Mapping active REMS programs to RxNorm drug products
- Joining REMS requirements to the drugs model for clinical decision support
- Identifying brand vs. generic products subject to a REMS program
