---
sidebar_position: 1
---

# Working with Packages

Learn how to work with drug packages and their identifiers in the system.

## Overview

Drugs are manufactured and sold in packages, and each package is assigned a unique identifier called a National Drug Code (NDC). This tutorial will guide you through understanding package identifiers (NDCs), mapping them to drugs, and working with package data effectively.

## What are NDCs?

**NDCs (National Drug Codes) are identifiers for packages of drugs.** Drugs are manufactured in packages, and the FDA assigns each package a unique National Drug Code (NDC). These codes serve as identifiers for drug packages sold in the United States.

### NDC Structure

NDCs are originally formatted with hyphens and consist of three segments:

1. **Labeler/Manufacturer segment** - Identifies the company that manufactures, repackages, or distributes the drug
2. **Product segment** - Identifies the specific drug product (ingredient, strength, and dose form)
3. **Pack size segment** - Identifies the package size and type

For example, an NDC might look like: `12345-678-90`
- `12345` = Labeler code
- `678` = Product code  
- `90` = Package code

### Converting to NDC11 Format

To work with NDCs programmatically, it's best to convert them to **NDC11 format** (an 11-digit format without hyphens). The conversion process involves:

1. Pad each segments with leading zeros so the first segment is 5 digits long, second segment is 4 digits long, and third segment is 2 digits long.
2. Remove all hyphens from the original NDC.
3. The total length of the NDC should now be 11 digits long.

For example:
- `12345-678-90` → `12345067890` (NDC11)
- `1234-567-8` → `01234056708` (NDC11)

### Hierarchical NDC Relationships

NDCs can contain other NDCs, creating a hierarchical structure. For instance, a box of pre-filled flu shot syringes has an outer box NDC, while each individual pre-filled syringe inside has its own different NDC. This packaging hierarchy is important to understand when working with drug package data.

For more information about the complexities of drug packaging and package size data, see our blog post on [The elusiveness of drug package size](/blog/the-elusiveness-of-drug-package-size).

## The Limitations of NDC Product Identifiers

While each NDC has a segment for a product identifier, this number is created by the manufacturer to represent their specific product. It is **not normalized** across different manufacturers or even across different products from the same manufacturer. This means:

- The same drug product from different manufacturers will have different product codes
- There's no standardized way to group equivalent products using just the NDC product segment
- Direct comparison or aggregation of drug data using NDC product codes alone is not reliable

## Normalizing with RxNorm

This is where **RxNorm** comes in. RxNorm is a standardized drug nomenclature maintained by the National Library of Medicine that maps NDCs to standardized **RXCUIs** (Rx Concept Unique Identifiers).

RXCUIs are normalized representations that combine three essential elements:

1. **Ingredient** - The active pharmaceutical ingredient(s)
2. **Strength** - The amount of active ingredient
3. **Dose form** - How the drug is administered (e.g., tablet, injection, capsule)

By mapping an NDC to its corresponding RXCUI, you can:
- Group equivalent drug products together regardless of manufacturer
- Compare products across different brands and manufacturers
- Aggregate drug data at a meaningful clinical level

For a deeper dive into drug products and how they're structured, see our blog post on [Working with drug product data](/blog/working-with-drug-product-data).

## Accessing the Drug Knowledge Graph

Once you normalize an NDC to a RXCUI, you gain access to the rich knowledge graph of drug information available from open drug data sources. This includes:

- Relationships between brand and generic products
- Drug class associations
- Ingredient-level information
- Dose form details
- Historical data and discontinued products
- And much more

This normalization step transforms NDCs from simple package identifiers into gateways to comprehensive, standardized drug information that can power analytics, research, and clinical applications.

## The Importance of Up-to-Date NDC Data

NDCs are not static identifiers. The FDA updates the NDC directory on a **daily basis**, with changes including:

- **New NDCs added** - As manufacturers introduce new products or package sizes
- **NDCs inactivated** - When products are discontinued or removed from the market
- **NDCs re-used** - The same NDC code may be assigned to a completely different drug product after a period of time

Working with outdated NDC data can lead to:
- Incorrect product identification
- Missing or invalid NDC mappings
- Inaccurate analytics and reporting
- Compliance and safety issues

For reliable NDC data operations, it's essential to have access to a **regularly updated drug database** that tracks these daily changes. Whether you're building applications, conducting research, or managing pharmacy operations, staying current with NDC updates ensures the accuracy and reliability of your drug data workflows.

:::tip Ready to Get Started?
**Don't let outdated data hold you back.** Explore our comprehensive drug database with weekly updates, complete RxNorm mappings, and rich drug knowledge graphs. Start building reliable, accurate drug data workflows today—your applications, research, and operations deserve the most current information available.

[Get Started →](/getting-started) | [Explore the Packages Model →](/concepts/packages)
:::