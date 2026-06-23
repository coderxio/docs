---
sidebar_position: 5
unlisted: true
---

# Brand / Generic Availability

Brand and generic availability for each active, prescribable ingredient and dose form combination.

## Overview

One row per ingredient and dose form, summarizing whether a generic and/or brand product is currently available on the market.

Built by joining the drugs and packages models on `clinical_drug_id` and restricting to active, prescribable packages, then aggregating by ingredient and dose form.

## Schema

| Column Name | Type | Description |
|------------|------|-------------|
| `ingredient_id` | string | RxNorm RXCUI for the active ingredient(s). |
| `ingredient_name` | string | Name of the active ingredient(s). |
| `brand_names` | string | Comma-separated list of distinct brand names available for this ingredient and dose form combination. |
| `dose_form_id` | string | RxNorm RXCUI for the dose form. |
| `dose_form_name` | string | Name of the dose form (e.g., "Oral Tablet"). |
| `is_generic_available` | boolean | Boolean flag indicating whether at least one active, prescribable generic product exists for this ingredient and dose form combination. |
| `is_brand_available` | boolean | Boolean flag indicating whether at least one active, prescribable brand product exists for this ingredient and dose form combination. |


## Use Cases

- Determining whether a generic alternative exists for a given ingredient and dose form
- Generic substitution and formulary analysis
- Identifying brand-only or generic-only market segments
