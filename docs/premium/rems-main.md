---
sidebar_position: 12
unlisted: true
---

# REMS - Main

Active FDA Risk Evaluation and Mitigation Strategies (REMS) programs with their currently approved version.

## Overview

One row per active REMS program, including program elements (medication guide, communication plan, ETASU, certification requirements), goals, and product counts.

Sourced from [FDA REMS data](https://www.accessdata.fda.gov/scripts/cder/rems/index.cfm?event=RemsData.page).

## Schema

| Column Name | Description | Tests |
|------------|-------------|-------|
| `rems_id` | A unique key used to identify each REMS program. | `unique`, `not_null` |
| `rems_name` | The name used on the REMS website to refer to the REMS program. Generally, single-product REMS are referred to by the brand name of the product, while shared system REMS are referred to by the name of the molecule or class to which they apply. | |
| `versionid` | A unique key used to identify the version of the REMS. | |
| `version_date` | The date the current approved version of the REMS was approved. | |
| `initial_approval_date` | The date the REMS was initially approved (earliest version_date across all versions). | |
| `rems_goals` | The goals for the REMS program, as specified in the REMS Document. | |
| `drug_name` | REMS program name from the REMS table (Drug Name field in REMS.csv). | |
| `rems_shared_system` | A flag indicating whether the REMS is a shared system REMS. | |
| `website` | A link to the application-holder's official website for the REMS. | |
| `is_active` | True when the REMS program is active. Note: FDA has reported that active/inactive status in the historical download file may not be accurate. | |
| `product_count` | Number of distinct products associated with this REMS program. | |
| `application_count` | Number of distinct FDA application numbers (NDA, BLA, ANDA) associated with products in this REMS program. | |


## Use Cases

- Identifying active REMS programs and their currently approved version
- Understanding REMS program elements and goals
- Linking REMS programs to products (see `rems__packages` and `rems__drugs`)
