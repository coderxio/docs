---
sidebar_position: 15
unlisted: true
---

# Indications

Therapeutic indications linking clinical drug products to diseases and conditions.

## Overview

Provides mappings between RxNorm clinical products (SCD/GPCK) and disease classifications using both MeSH (Medical Subject Headings) and ICD10CM codes. Indications represent conditions that a drug may treat or prevent, as determined through UMLS crosswalk relationships.

Each row represents a relationship between a clinical drug product and a disease/condition, with both MeSH and ICD10CM classifications provided when available. The `indication_type` field distinguishes between therapeutic uses (`may_treat`) and preventive uses (`may_prevent`).

This model is useful for understanding drug-disease relationships, supporting clinical decision support systems, pharmacoepidemiological research, and identifying drugs indicated for specific conditions.

Data sourced from UMLS crosswalk mappings between RxNorm clinical products and disease classifications via MeSH codes, with ICD10CM mappings derived through SNOMEDCT_US relationships.

## Schema

| Column Name | Type | Description | Tests |
|------------|------|-------------|-------|
| `drug_id` | string | RxNorm RXCUI identifier for the clinical product (SCD or GPCK). This represents the clinical/generic drug product, not brand products. Can be joined to the drugs model using `drugs.clinical_drug_id = indications.drug_id`. | `not_null` |
| `indication_type` | string | Type of therapeutic relationship between the drug and the indication. `may_treat` = the drug may be used to treat this condition; `may_prevent` = the drug may be used to prevent this condition. | `accepted_values: ['may_treat', 'may_prevent']` |
| `mesh_id` | string | MeSH (Medical Subject Headings) code for the disease or condition. MeSH codes are hierarchical medical subject headings maintained by the National Library of Medicine. Format is typically "D" followed by digits (e.g., "D000001"). | |
| `mesh_indication_name` | string | MeSH term name for the disease or condition. Provides the human-readable description of the indication as classified in the MeSH vocabulary. | |
| `icd10_id` | string | ICD10CM (International Classification of Diseases, 10th Revision, Clinical Modification) code for the disease or condition. ICD10CM codes are standardized diagnostic codes used in clinical documentation and billing. May be null if no ICD10CM mapping exists for the MeSH code. | |
| `icd10_indication_name` | string | ICD10CM term name for the disease or condition. Provides the human-readable description of the indication as classified in the ICD10CM vocabulary. May be null if no ICD10CM mapping exists for the MeSH code. | |


## Use Cases

- Identifying drugs indicated to treat or prevent a specific condition
- Mapping clinical drug products to MeSH and ICD10CM disease classifications
- Supporting clinical decision support and pharmacoepidemiological research
- Distinguishing therapeutic (`may_treat`) from preventive (`may_prevent`) indications
