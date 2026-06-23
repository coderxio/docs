---
sidebar_position: 6
unlisted: true
---

# Packaging

Package-level dimensional information for NDCs derived from FDA packaging components.

## Overview

Provides the outermost and innermost packaging units, total product quantity, and the raw FDA package description for each NDC.

Data sourced from `int_fda_packaging_components`, via the `pack_size` model.

## Schema

| Column Name | Type | Description |
|------------|------|-------------|
| `ndc11` | string | National Drug Code (NDC) in standardized 11-digit format. |
| `outermost_unit` | string | Unit of measurement for the outermost (top-level) packaging component. |
| `total_product` | numeric | Total product quantity in the package, computed across nested packaging components (e.g., total tablets, capsules, or milliliters). |
| `innermost_unit` | string | Unit of measurement for the innermost packaging component. Normalized to "KIT" when the inner unit describes a kit. |
| `packagedescription` | string | Raw FDA package description text describing the package configuration and contents. |


## Use Cases

- Calculating per-pack pricing from per-unit prices
- Normalizing package quantities for cost and inventory analysis
- Interpreting FDA package descriptions into structured units
