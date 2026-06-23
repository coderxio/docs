---
sidebar_position: 10
unlisted: true
---

# NCPDP - DEA Schedules

Crosswalk between DEA controlled substance schedules and NCPDP/NCIt terminology.

## Overview

Maps each DEA schedule to its numeric form and the corresponding NCPDP preferred term and NCIt code.

Data sourced from the `ncpdp_dea_crosswalk` seed.

## Schema

| Column Name | Type | Description |
|------------|------|-------------|
| `dea_schedule` | string | DEA schedule code (e.g., "CI", "CII"). |
| `dea_schedule_numeric` | integer | Numeric form of the DEA schedule (e.g., 1 for CI, 2 for CII). |
| `ncit_code` | string | NCIt (NCI Thesaurus) code for the DEA schedule term. |
| `ncpdp_preferred_term` | string | NCPDP preferred term for the DEA schedule (e.g., "Schedule I Substance"). |


## Use Cases

- Translating DEA schedules into NCPDP preferred terms for e-prescribing
- Mapping controlled substance schedules to standardized NCIt codes
- Building NCPDP-compliant controlled substance records
