---
sidebar_position: 3
---

# Working with Ingredients

Learn how to work with pharmaceutical ingredients in the system.

## Overview

Ingredients are the active pharmaceutical components of drugs. The `ingredients` table provides detailed information about ingredient strengths, components, and precise ingredient classifications. This tutorial will guide you through understanding RxNorm's ingredient concepts and how to work with ingredient data effectively.

## Multiple Ingredients vs Single Ingredients

RxNorm has two key concepts for ingredients:

1. **Multiple ingredients (ingredient type = MIN)**: Represent combinations of ingredients
2. **Single ingredients (ingredient type = IN)**: Represent individual active ingredients

### Single Ingredient Drugs

A drug like **lisinopril** will be associated with a single ingredient (IN). The ingredient represents the active pharmaceutical ingredient itself.

### Multiple Ingredient Drugs

A drug like **lisinopril / hydrochlorothiazide** will be associated with a multiple ingredient (MIN). This multiple ingredient represents the combination of two or more active ingredients.

### Ingredient Components

When a drug is associated with a multiple ingredient (MIN), the `ingredients` table will have **multiple rows** - one for each "ingredient component". 

The **ingredient component** represents the lowest level ingredient available in a drug and should always be a single ingredient (IN) concept. The "ingredient" associated to the drug will be the multiple ingredient (MIN) concept.

**Example**: For lisinopril / hydrochlorothiazide:
- The drug is associated with a multiple ingredient (MIN) representing the combination
- The `ingredients` table will have two rows:
  - One row for lisinopril (IN) as an ingredient component
  - One row for hydrochlorothiazide (IN) as an ingredient component

## Mapping Drugs to Ingredients

### Using Clinical Drug ID

It's important to note that we map ingredients to drugs via the `clinical_drug_id` of the drug table. This is because **regardless of whether a drug is brand name or generic, it should have the same clinical ingredients**.

> **Important**: Always use `clinical_drug_id` (not `drug_id`) when joining from the `drugs` table to the `ingredients` table. This ensures you get the correct ingredient mappings for both brand and generic drugs.

### Drug Component ID

In certain situations (like "pack" drugs), the `drug_component_id` column will be different from the `drug_id` column. Some "pack" drugs will have multiple different drugs that each have their own mappings to ingredients.

**Example Query**:
```sql
-- Join drugs to ingredients using clinical_drug_id
SELECT 
    d.drug_id,
    d.drug_name,
    d.clinical_drug_id,
    i.ingredient_id,
    i.ingredient_name,
    i.ingredient_component_id,
    i.ingredient_component_name
FROM drugs d
JOIN ingredients i ON d.clinical_drug_id = i.drug_id
WHERE d.drug_name LIKE '%lisinopril%'
ORDER BY d.drug_id, i.ingredient_component_id;
```

## Precise Ingredients

In addition to multiple vs single ingredients, there is also the concept of a **"precise ingredient"**. This is important for certain drugs that have different effects based on the salt form of the ingredient.

### Example: Metoprolol Salt Forms

For instance, **metoprolol tartrate** and **metoprolol succinate** are both a "metoprolol" ingredient - however, they each have different "precise ingredients":
- One is "metoprolol tartrate" 
- The other is "metoprolol succinate"

These different salt forms can have different clinical effects, dosing schedules, and pharmacokinetic properties, so it's important to distinguish between them using the precise ingredient.

**Example Query**:
```sql
-- Find all metoprolol products and their precise ingredients
SELECT 
    d.drug_name,
    i.ingredient_name,
    i.ingredient_component_name,
    i.precise_ingredient_name
FROM drugs d
JOIN ingredients i ON d.clinical_drug_id = i.drug_id
WHERE i.ingredient_name LIKE '%metoprolol%'
  AND i.ingredient_type = 'IN'
ORDER BY i.precise_ingredient_name;
```

## Ingredient Strengths

The `ingredients` table is where you can work with ingredient **strengths**. Strengths have:

- **Numerator value** (and numerator unit): The primary strength value (e.g., 500 for "500mg")
- **Denominator value** (and denominator unit): Used for concentration-based strengths (e.g., 5 for "5mg/5ml")
- **Strength text**: A human-readable text representation for convenience

### Working with Strength Data

You can work with strength data in two ways:

1. **Numerically**: Use `strength_numerator_value`, `strength_numerator_unit`, `strength_denominator_value`, and `strength_denominator_unit` for calculations and comparisons
2. **Textually**: Use `strength_text` for display and simple matching

**Example Queries**:
```sql
-- Find all drugs with a specific ingredient strength
SELECT 
    d.drug_name,
    i.ingredient_component_name,
    i.strength_text,
    i.strength_numerator_value,
    i.strength_numerator_unit
FROM drugs d
JOIN ingredients i ON d.clinical_drug_id = i.drug_id
WHERE i.ingredient_component_name = 'metformin'
  AND i.strength_numerator_value = 500
  AND i.strength_numerator_unit = 'MG'
ORDER BY d.drug_name;

-- Find all concentration-based strengths (those with denominators)
SELECT 
    d.drug_name,
    i.ingredient_component_name,
    i.strength_text,
    i.strength_numerator_value,
    i.strength_numerator_unit,
    i.strength_denominator_value,
    i.strength_denominator_unit
FROM drugs d
JOIN ingredients i ON d.clinical_drug_id = i.drug_id
WHERE i.strength_denominator_value IS NOT NULL
ORDER BY i.ingredient_component_name, i.strength_text;
```

## Common Patterns

### Finding All Ingredients for a Drug

```sql
-- Get all ingredient components for a specific drug
SELECT 
    i.ingredient_component_name,
    i.precise_ingredient_name,
    i.strength_text,
    i.ingredient_name AS multiple_ingredient_name
FROM ingredients i
WHERE i.drug_id = 'YOUR_CLINICAL_DRUG_ID'
ORDER BY i.ingredient_component_id;
```

### Finding All Drugs with a Specific Ingredient

```sql
-- Find all drugs containing a specific ingredient
SELECT DISTINCT
    d.drug_id,
    d.drug_name,
    d.clinical_drug_id
FROM drugs d
JOIN ingredients i ON d.clinical_drug_id = i.drug_id
WHERE i.ingredient_component_name = 'lisinopril'
ORDER BY d.drug_name;
```

### Finding Multi-Ingredient Drugs

```sql
-- Find drugs with multiple ingredient components
SELECT 
    d.drug_id,
    d.drug_name,
    COUNT(DISTINCT i.ingredient_component_id) AS ingredient_count,
    STRING_AGG(i.ingredient_component_name, ' / ') AS ingredients
FROM drugs d
JOIN ingredients i ON d.clinical_drug_id = i.drug_id
GROUP BY d.drug_id, d.drug_name
HAVING COUNT(DISTINCT i.ingredient_component_id) > 1
ORDER BY ingredient_count DESC, d.drug_name;
```

## Best Practices

1. **Always use `clinical_drug_id`** when joining from `drugs` to `ingredients` table
2. **Understand the difference** between ingredient (MIN/IN), ingredient component (always IN), and precise ingredient
3. **Use ingredient components** when you need the lowest-level ingredient information
4. **Use precise ingredients** when salt forms matter for your analysis
5. **Work with strength data numerically** when performing calculations or comparisons
6. **Use `strength_text`** for display purposes or simple text matching
7. **Be aware of `drug_component_id`** differences for pack drugs with multiple components
