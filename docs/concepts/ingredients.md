---
sidebar_position: 4
---

# Ingredients

Ingredients provide detailed ingredient strengths, components, and precise ingredient classifications.

## Overview

Ingredients represent the active pharmaceutical components of drugs, with detailed information about their strengths, precise classifications, and how they combine to form complete drug products.

## Schema

| Column Name | Description | Tests |
|------------|-------------|-------|
| `drug_id` | Clinical product RxNorm RXCUI (SCD or GPCK) that this ingredient belongs to. | |
| `drug_component_id` | Clinical product component RXCUI. Used to distinguish different components in multi-component products. | |
| `ingredient_id` | RxNorm RXCUI for the ingredient level concept. | |
| `ingredient_name` | Name of the ingredient. | |
| `ingredient_type` | RxNorm term type for the ingredient (typically IN for ingredient). | |
| `ingredient_component_id` | RxNorm RXCUI for the ingredient component level concept, providing more specific classification than ingredient. | |
| `ingredient_component_name` | Name of the ingredient component. | |
| `ingredient_component_type` | RxNorm term type for the ingredient component (typically MIN for ingredient component). | |
| `precise_ingredient_id` | RxNorm RXCUI for the precise ingredient level concept, the most specific ingredient classification. | |
| `precise_ingredient_name` | Name of the precise ingredient. | |
| `ingredient_strength_id` | RxNorm RXCUI for the ingredient strength concept, which represents the ingredient with its specific strength. | |
| `ingredient_strength_name` | Name of the ingredient strength concept. | |
| `strength_numerator_value` | Numeric value of the strength numerator (e.g., 500 for "500mg"). | |
| `strength_numerator_unit` | Unit for the strength numerator (e.g., "MG" for milligrams). | |
| `strength_denominator_value` | Numeric value of the strength denominator, used for concentration-based strengths (e.g., 5 for "5mg/5ml"). | |
| `strength_denominator_unit` | Unit for the strength denominator (e.g., "ML" for milliliters). | |
| `strength_text` | Human-readable text representation of the ingredient strength (e.g., "500 MG", "5 MG/5 ML"). | |

**Note:** The unique constraint is on the combination of `drug_id || '-' || drug_component_id || '-' || ingredient_component_id || '-' || precise_ingredient_id`.

## Key Features

- **Ingredient Strengths**: Detailed strength information for each active ingredient
- **Component Details**: Comprehensive component information and specifications
- **Precise Classifications**: Accurate ingredient categorization and classification
- **Composition Tracking**: Track how ingredients combine in multi-ingredient products
- **Standardized Naming**: Use of standardized ingredient names and identifiers

## Use Cases

- Allergy checking and contraindication analysis
- Drug interaction screening
- Ingredient-based product search
- Formulation analysis
- Regulatory compliance
