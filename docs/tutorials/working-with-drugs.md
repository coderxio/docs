---
sidebar_position: 2
---

# Working with Drugs

Learn how to work with drug information in the system.

## Overview

The `drugs` table contains all drugs in the system, including:
- Active and inactive drugs
- Prescribable and non-prescribable medications
- Brand name drugs
- Generic drugs

This tutorial will guide you through understanding the drug data structure and how to work with drug information effectively.

## Drug ID Structure

All drugs in the system have two important identifiers:

- **`drug_id`**: The unique identifier for the specific drug product
- **`clinical_drug_id`**: The identifier representing the clinical drug (ingredient, dose form, and strength combination)

### Understanding the Relationship

The relationship between `drug_id` and `clinical_drug_id` depends on whether the drug is generic or brand:

- **Generic drugs**: For generic drugs, the `drug_id` will be the same as the `clinical_drug_id`
- **Brand name drugs**: For brand name drugs, the `clinical_drug_id` will be different from the `drug_id`

> **Important**: Just because a brand drug has a `clinical_drug_id` does not mean it necessarily has a generic alternative. The clinical drug ID represents the actual drug ingredient, dose form, and strength that is having a clinical effect on the body, regardless of whether the drug is brand or generic.

### Using Clinical Drug ID for Mapping

Since all drugs (both brand and generic) have a `clinical_drug_id`, you should use this ID (not `drug_id`) when mapping to other parts of the knowledge graph, such as:

- Ingredient tables
- Clinical effect mappings
- Other downstream relationships

**Example**: When joining to ingredient tables, always use `clinical_drug_id` instead of `drug_id`.

## Brand vs Generic Drugs

The system distinguishes between brand name drugs and generic drugs using the `is_brand` column.

### Brand Name Drugs

For brand name drugs:
- `is_brand = true`
- The `brand_name` column will contain the single brand name
- The `available_brand_names` column will be `NULL`

### Generic/Non-Brand Drugs

For non-brand drugs:
- `is_brand = false`
- The `brand_name` column will be `NULL`
- The `available_brand_names` column may contain a comma-separated list of available brand names (if any exist)

## Linking Drugs to NDCs

When linking drugs to NDCs (National Drug Codes), the choice of identifier depends on your use case:

### Using `drug_id` (Most Common)

**Generally, linking is done with `drug_id`** since an NDC can specifically represent a brand product versus a generic product. This approach gives you precise package-to-drug mappings and preserves the distinction between brand and generic products.

### Using `clinical_drug_id` (Aggregation Use Cases)

If you want to know how many NDCs there are for a given drug **regardless of whether it's brand or generic**, you can link the two tables based on `clinical_drug_id`. This aggregates all NDCs (both brand and generic) that represent the same clinical drug.

**Example**: If you're analyzing market coverage or want to see all available package options for a specific clinical drug formulation, using `clinical_drug_id` will give you the complete picture across all manufacturers and brand/generic variations.

## Dose Form and Route Information

### Dose Form

Dose form information is available directly at the drug level in the `drugs` table. This provides convenient access to how the medication is formulated (e.g., tablet, capsule, injection).

### Route Information

Route information (e.g., oral, intravenous, topical) is planned for inclusion at the drug level. However, RxNorm does not provide direct mappings to route information, so the system will need to:

- Join to other data sources (such as the FDA NDC Directory), or
- Create custom mappings

Route information will be added in a future update.

## Ingredients

### Ingredient Information at Drug Level

For convenience, ingredient information is included directly at the drug level. However, for detailed ingredient analysis, it's recommended to work with the dedicated `ingredients` table.

### Handling Multiple Ingredients

Some "pack" type drugs can have multiple different ingredient identifiers. Currently, the system handles this by:

- **Pipe-delimiting** the ingredient IDs
- **Pipe-delimiting** the ingredient names

> **Note**: For more information on packs and kits, see [Working with drug product data](/blog/working-with-drug-product-data#packs-and-kits).

Future updates will account for these multi-ingredient drugs differently, providing better structured access to pack and kit information.

## Filtering Drugs

The `drugs` table includes helpful filters for common use cases:

### Active Filter

The `active` column allows you to filter for only active drugs, excluding inactive or discontinued medications.

### Prescribable Filter

The `prescribable` column allows you to filter for only prescribable medications, excluding non-prescribable items.

> **Note**: These filters come directly from RxNorm and are renamed from their original column naming conventions for clarity.

### Example Queries

```sql
-- Get only active, prescribable drugs
SELECT * FROM drugs 
WHERE active = true AND prescribable = true;

-- Get all brand name drugs that are active
SELECT * FROM drugs 
WHERE is_brand = true AND active = true;
```

## Best Practices

1. **Always use `clinical_drug_id`** when joining to ingredient tables or other downstream relationships
2. **Use `drug_id`** when linking to NDCs to preserve brand vs. generic distinctions, or when you need to identify the specific drug product
3. **Use `clinical_drug_id`** when linking to NDCs if you want to aggregate across all brand and generic variations of a clinical drug
4. **Check `is_brand`** to understand whether you're working with a brand or generic drug
5. **Use `active` and `prescribable` filters** to narrow your results to relevant medications
6. **For detailed ingredient analysis**, join to the `ingredients` table rather than relying solely on drug-level ingredient fields
7. **Be aware of pipe-delimited values** in ingredient fields for pack/kit drugs

:::tip Ready to Get Started?
**Working with drug data doesn't have to be complicated.** Put this guide to use with the CodeRx Drug Database—get instant access to comprehensive drug information, complete RxNorm mappings, and all the relationships you need to build powerful applications. With weekly updates and standardized identifiers, you can focus on building your solution instead of wrestling with data complexity.

[Get Started →](/getting-started) | [Explore the Drugs Model →](/concepts/drugs)
:::
