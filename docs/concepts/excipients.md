---
sidebar_position: 5
---

# Excipients

Excipients track inactive ingredients with special flags for preservatives, dyes, and gluten.

## Overview

Excipients represent the inactive ingredients in pharmaceutical products. This concept provides comprehensive tracking of these components, with special attention to ingredients that may be relevant for patient safety, allergies, or dietary restrictions.

## Schema

| Column Name | Description | Tests |
|------------|-------------|-------|
| `ndc9` | The first 9 digits of the NDC11 National Drug Code (NDC) format, representing the product level without package-specific information. Used to identify which drug product contains this excipient. This is used to join to the packages model. | `not_null` |
| `mthspl_excipient_name` | The name of the inactive ingredient as reported in DailyMed (MTHSPL) via RxNorm. This is the source name from the Structured Product Labeling data. | |
| `fda_unii_code` | FDA Unique Ingredient Identifier (UNII) code for the excipient. UNII codes are FDA-assigned identifiers for substances in drug products. Null if no UNII mapping exists for this excipient. | |
| `fda_unii_display_name` | FDA UNII standardized display name for the excipient. Provides a normalized chemical or ingredient name as maintained by FDA. Null if no UNII mapping exists. | |
| `pubchem_id` | PubChem Compound ID (CID) for the excipient, if available. Can be used to generate links to PubChem detail pages and access additional chemical information, structures, and properties. Example link format: `concat('https://pubchem.ncbi.nlm.nih.gov/compound/', pubchem_id)` | |
| `is_preservative` | Boolean flag indicating if this excipient is classified as a preservative based on USP (United States Pharmacopeia) preservative classifications. Determined by matching UNII CAS Registry Number (RN) to USP preservative product list. This list was pulled from the USP website and manually curated. May not be comprehensive or accurate, so please use with caution. | |
| `is_dye` | Boolean flag indicating if this excipient is classified as a dye based on manual review by a pharmacist. Useful for identifying colorants in drug products, which may be relevant for patient preferences or allergen considerations. May not be comprehensive or accurate, so please use with caution. | |
| `is_gluten` | Boolean flag indicating if this excipient contains or is derived from gluten based on manual review by a pharmacist. Critical for patients with celiac disease or gluten sensitivity to identify potential gluten sources in medications. May not be comprehensive or accurate, so please use with caution. | |

## Key Features

- **Inactive Ingredient Tracking**: Complete listing of all inactive ingredients
- **Preservative Identification**: Special flags to identify preservatives in formulations
- **Dye Tracking**: Identification of colorants and dyes used in products
- **Gluten-Free Indicators**: Flags for gluten-containing or gluten-free status
- **Allergen Information**: Track common allergens present in excipients

## Use Cases

- Allergy and sensitivity management
- Dietary restriction compliance (gluten-free, dye-free, etc.)
- Patient safety screening
- Formulation analysis
- Regulatory documentation
