---
sidebar_position: 8
unlisted: true
---

# NCPDP - Representative NDCs

A single representative NDC chosen for each RxNorm drug product.

## Overview

Used to select one NDC that best represents a `drug_id` for downstream lookups (e.g., NCPDP-style attribute crosswalks).

Selection prefers NDCs that are not repackers, unit-dose, or sample packages, and that are active and prescribable; when a drug has no such NDC, any NDC is used as a fallback. Among eligible NDCs, the one with the earliest (lowest) FDA application number is chosen.

Data sourced from `int_packages`, `int_fda_ndcs`, `all_ndcs_to_sources`, and `int_ndcs_to_org_types`, via `int_representative_ndcs`.

## Schema

| Column Name | Type | Description | Tests |
|------------|------|-------------|-------|
| `drug_id` | string | RxNorm RXCUI for the drug product. | `unique`, `not_null` |
| `ndc11` | string | The representative 11-digit NDC selected for this drug_id. | `not_null` |


## Use Cases

- Picking a single canonical NDC per drug for crosswalk joins
- Reducing many-NDC drugs to one representative package for lookups
- Building NCPDP-style attribute mappings keyed on a representative NDC
