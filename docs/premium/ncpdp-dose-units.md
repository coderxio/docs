---
sidebar_position: 11
unlisted: true
---

# NCPDP - Dose Units

NCPDP DoseUnitOfMeasure terminology from the NCPDP/NCIt vocabulary.

## Overview

Provides the set of preferred terms for dose units of measure, filtered to the NCIt DoseUnitOfMeasure subset (C121847).

Data sourced from the `ncpdp` source table.

## Schema

| Column Name | Type | Description |
|------------|------|-------------|
| `ncit_code` | string | NCIt (NCI Thesaurus) code for the dose unit of measure. |
| `ncpdp_preferred_term` | string | NCPDP preferred term for the dose unit of measure. |


## Use Cases

- Validating dose units of measure against NCPDP terminology
- Populating NCPDP-compliant dose unit fields in e-prescribing records
- Standardizing dose unit vocabulary across systems
