---
sidebar_position: 3
---

# Classes

Classes provide multiple classification systems to aggregate drugs by therapeutic class or indication.

## Overview

Classes offer various classification schemes that group drugs based on their therapeutic use, mechanism of action, or indication. This enables systematic organization and analysis of pharmaceutical products across different classification systems.

## Schema

| Column Name | Description | Tests |
|------------|-------------|-------|
| `drug_id` | RxNorm RXCUI identifier for the drug product. Product-level RXCUI from RxClass ATCPROD relationships. | `not_null` |
| `drug_name` | The RxNorm normalized description (STR) for the drug product. Provides the standardized drug name associated with the RXCUI. | |
| `atc_1_code` | ATC Level 1 code (1 letter). Represents the anatomical main group (e.g., "A" for alimentary tract and metabolism, "C" for cardiovascular system). | |
| `atc_1_name` | ATC Level 1 name. The descriptive name for the anatomical main group (e.g., "ALIMENTARY TRACT AND METABOLISM"). | |
| `atc_2_code` | ATC Level 2 code (2 digits appended to Level 1). Represents the therapeutic subgroup (e.g., "A10" for drugs used in diabetes). | |
| `atc_2_name` | ATC Level 2 name. The descriptive name for the therapeutic subgroup (e.g., "DRUGS USED IN DIABETES"). | |
| `atc_3_code` | ATC Level 3 code (1 letter appended to Level 2). Represents the therapeutic/pharmacological subgroup (e.g., "A10B" for blood glucose lowering drugs, excl. insulins). | |
| `atc_3_name` | ATC Level 3 name. The descriptive name for the therapeutic/pharmacological subgroup (e.g., "BLOOD GLUCOSE LOWERING DRUGS, EXCL. INSULINS"). | |
| `atc_4_code` | ATC Level 4 code (1 letter appended to Level 3). Represents the chemical/therapeutic/pharmacological subgroup (e.g., "A10BA" for biguanides). This is the most specific level provided in this model. | |
| `atc_4_name` | ATC Level 4 name. The descriptive name for the chemical/therapeutic/pharmacological subgroup (e.g., "BIGUANIDES"). | |

## Key Features

- **Multiple Classification Systems**: Support for various classification schemes (ATC, USP, etc.)
- **Therapeutic Classifications**: Group drugs by their therapeutic use or indication
- **Hierarchical Organization**: Navigate through class hierarchies and subcategories
- **Cross-Classification**: Drugs can belong to multiple classes simultaneously
- **Standardized Taxonomies**: Use of industry-standard classification systems

## Use Cases

- Formulary organization
- Therapeutic substitution analysis
- Drug utilization review
- Clinical research and analysis
- Market segmentation
