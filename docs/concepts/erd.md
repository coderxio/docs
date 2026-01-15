---
sidebar_position: 7
---

# Entity Relationship Diagram

This diagram illustrates the relationships between the core concepts in the CodeRx data model.

```mermaid
erDiagram
    PACKAGES {
        string ndc11 PK "Primary Key"
        string ndc9 "9-digit NDC"
        string drug_id FK "References Drugs"
        string drug_name
        string drug_type
        boolean is_brand
        string brand_name
        string clinical_drug_id
        string clinical_drug_name
        string clinical_drug_type
        decimal nadac_per_unit
        string pricing_unit
        date price_start_date
        date price_end_date
        boolean is_first_price
        boolean is_last_price
        decimal dollar_change
        decimal percent_change
        integer change_type
        boolean active
        boolean prescribable
    }

    DRUGS {
        string drug_id PK "Primary Key (RXCUI)"
        string drug_name
        string drug_type "SBD, BPCK, SCD, GPCK"
        boolean is_brand
        string brand_name
        string available_brand_names
        string clinical_drug_id FK "Self-reference"
        string clinical_drug_name
        string clinical_drug_type
        string dose_form_id
        string dose_form_name
        string ingredient_id "Can be pipe-delimited"
        string ingredient_name "Can be pipe-delimited"
        string ingredient_type
        boolean active
        boolean prescribable
    }

    INGREDIENTS {
        string drug_id FK "References Drugs (clinical)"
        string drug_component_id
        string ingredient_id
        string ingredient_name
        string ingredient_type
        string ingredient_component_id
        string ingredient_component_name
        string ingredient_component_type
        string precise_ingredient_id
        string precise_ingredient_name
        string ingredient_strength_id
        string ingredient_strength_name
        decimal strength_numerator_value
        string strength_numerator_unit
        decimal strength_denominator_value
        string strength_denominator_unit
        string strength_text
    }

    CLASSES {
        string drug_id FK "References Drugs"
        string drug_name
        string atc_1_code
        string atc_1_name
        string atc_2_code
        string atc_2_name
        string atc_3_code
        string atc_3_name
        string atc_4_code
        string atc_4_name
    }

    EXCIPIENTS {
        string ndc9 FK "References Packages"
        string mthspl_excipient_name
        string fda_unii_code
        string fda_unii_display_name
        string pubchem_id
        boolean is_preservative
        boolean is_dye
        boolean is_gluten
    }

    SYNONYMS {
        string drug_id FK "References Drugs"
        string synonym
        string source "RXNORM, NADAC, FDA"
    }

    %% Relationships
    PACKAGES ||--o{ EXCIPIENTS : "has (via ndc9)"
    PACKAGES }o--|| DRUGS : "maps to (via drug_id)"
    DRUGS ||--o{ INGREDIENTS : "contains"
    DRUGS ||--o{ CLASSES : "classified in"
    DRUGS ||--o{ SYNONYMS : "has"
    DRUGS }o--o| DRUGS : "brand/generic (via clinical_drug_id)"
```

## Relationship Details

### Packages to Drugs
- **Type**: Many-to-One
- **Key**: `packages.drug_id` → `drugs.drug_id`
- **Description**: Multiple NDC packages can map to the same drug product. A drug may have many package sizes and configurations.

### Packages to Excipients
- **Type**: One-to-Many
- **Key**: `packages.ndc9` → `excipients.ndc9`
- **Description**: Each package (at the product level) can have multiple excipients (inactive ingredients).

### Drugs to Ingredients
- **Type**: One-to-Many
- **Key**: `drugs.drug_id` → `ingredients.drug_id`
- **Description**: Each clinical drug product can have multiple active ingredients with detailed strength information.

### Drugs to Classes
- **Type**: One-to-Many
- **Key**: `drugs.drug_id` → `classes.drug_id`
- **Description**: A drug can belong to multiple therapeutic classes across different classification systems (e.g., ATC).

### Drugs to Synonyms
- **Type**: One-to-Many
- **Key**: `drugs.drug_id` → `synonyms.drug_id`
- **Description**: Each drug can have multiple synonyms from various sources (RxNorm, NADAC, FDA).

### Drugs Self-Reference
- **Type**: Many-to-One (Self-referential)
- **Key**: `drugs.clinical_drug_id` → `drugs.drug_id`
- **Description**: Brand drugs reference their generic/clinical equivalents. Clinical drugs reference themselves.

## Key Identifiers

- **NDC11**: 11-digit National Drug Code (unique package identifier)
- **NDC9**: 9-digit NDC (product level, without package code)
- **RXCUI**: RxNorm Concept Unique Identifier (drug product identifier)
- **UNII**: FDA Unique Ingredient Identifier (excipient identifier)

