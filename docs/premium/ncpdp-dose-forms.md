---
sidebar_position: 9
unlisted: true
---

# NCPDP - Dose Forms

Crosswalk between RxNorm dose forms and NCPDP/NCIt dose form and quantity unit-of-measure terminology.

## Overview

Maps each RxNorm dose form to its corresponding NCPDP strength form and quantity unit-of-measure preferred terms and NCIt codes.

Data sourced from the `ncpdp_dose_form_crosswalk` seed.

## Schema

| Column Name | Type | Description |
|------------|------|-------------|
| `dose_form_id` | string | RxNorm RXCUI for the dose form. |
| `dose_form_name` | string | RxNorm name of the dose form (e.g., "12 hour Extended Release Capsule"). |
| `ncit_strength_form_code` | string | NCIt (NCI Thesaurus) code for the NCPDP strength form. |
| `ncpdp_strength_form_preferred_term` | string | NCPDP preferred term for the strength form (e.g., "Extended Release Capsule"). |
| `ncit_quantity_uom_code` | string | NCIt code for the NCPDP quantity unit of measure. |
| `ncpcp_quantity_uom_preferred_term` | string | NCPDP preferred term for the quantity unit of measure (e.g., "Capsule"). |


## Use Cases

- Translating RxNorm dose forms into NCPDP strength forms for e-prescribing
- Mapping quantity units of measure between RxNorm and NCPDP
- Building NCPDP-compliant medication records
