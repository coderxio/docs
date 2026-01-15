---
sidebar_position: 2
---

# Drugs

Drugs provide a unified view of brand and clinical products with dose forms, ingredients, and brand relationships.

## Overview

The Drugs concept represents a comprehensive data model that unifies brand-name and clinical products, providing detailed information about dose forms, active ingredients, and relationships between different brand variations of the same drug.

## Schema

| Column Name | Description | Tests |
|------------|-------------|-------|
| `drug_id` | RxNorm RXCUI identifier for the drug. Can be either a brand product (SBD/BPCK) or clinical product (SCD/GPCK) RXCUI. This field is unique and serves as the primary key for the model. | `unique`, `not_null` |
| `drug_name` | The RxNorm name (STR) for this drug. | |
| `drug_type` | RxNorm term type (TTY). Allowable values are SBD (brand drug), BPCK (branded pack), SCD (clinical drug), or GPCK (generic pack). | `accepted_values: ['SBD', 'BPCK', 'SCD', 'GPCK']` |
| `is_brand` | Boolean flag indicating if this is a brand drug (true) or clinical/generic drug (false). | |
| `brand_name` | The brand name extracted from the drug name for brand products. Null for clinical/generic drugs. | |
| `available_brand_names` | Comma-separated list of active, prescribable brand names available for this clinical drug. Null for brand products themselves. | |
| `clinical_drug_id` | RxNorm RXCUI of the related clinical product. For brand drugs, this links to the generic equivalent. For clinical drugs, this matches drug_id. | |
| `clinical_drug_name` | The name of the related clinical product. | |
| `clinical_drug_type` | Term type of the clinical product (typically SCD for single ingredient or GPCK for multi-ingredient packs). | |
| `dose_form_id` | RxNorm RXCUI for the dose form. For drugs with multiple dose forms (generally drug type GPCKs and BPCKs), this will be 746839 (Pack). | |
| `dose_form_name` | Name of the dose form (e.g., "Oral Tablet"). For drugs with multiple dose forms (generally drug type GPCKs and BPCKs), this will be "Pack". | |
| `ingredient_id` | RxNorm RXCUI for the active ingredient(s). For drugs with multiple ingredients, this will be the MIN (multiple ingredient) RXCUI. For drugs with a single ingredient, this will be the IN (single ingredient) RXCUI. For drugs with multiple MINs or INs (a subset of GPCKs and BPCKs), this will be a pipe-delimited string of the MIN or IN RXCUI(s). | |
| `ingredient_name` | Name of the active ingredient(s). For drugs with multiple ingredients, this will be the MIN (multiple ingredient) name. For drugs with a single ingredient, this will be the IN (single ingredient) name. For drugs with multiple MINs or INs (a subset of GPCKs and BPCKs), this will be a pipe-delimited string of the MIN or IN name(s). | |
| `ingredient_type` | RxNorm term type for the ingredient (typically IN for single ingredient drugs and MIN for multi-ingredient drugs). | |
| `active` | Boolean flag indicating if this drug concept is currently active in RxNorm. | |
| `prescribable` | Boolean flag indicating if this drug concept is prescribable according to RxNorm. | |

## Key Features

- **Unified Product View**: Single source of truth for both brand and clinical products
- **Dose Forms**: Detailed information about available dose forms (tablets, capsules, injections, etc.)
- **Ingredient Composition**: Complete listing of active ingredients and their strengths
- **Brand Relationships**: Track relationships between brand-name products and their generic equivalents
- **Clinical Information**: Access to clinical product data and specifications

## Use Cases

- Product comparison and selection
- Generic substitution analysis
- Formulary management
- Clinical decision support
