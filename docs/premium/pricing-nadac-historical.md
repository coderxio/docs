---
sidebar_position: 2
unlisted: true
---

# Pricing - NADAC Historical

Historical NADAC (National Average Drug Acquisition Cost) pricing per NDC, with one row per distinct price period for each NDC.

## Overview

Each row captures a price, its effective window (`start_date` / `end_date`), period-over-period change metrics, and the RxNorm drug, clinical product, and ingredient associated with the NDC.

Recency convenience flags (`is_within_30_days` through `is_within_365_days`) indicate whether a price period's `end_date` falls within the given number of days from the current date, and `is_from_current_release` indicates whether the price appears in the most recent NADAC release.

Data sourced from `int_nadac_historical_pricing` (built from `stg_nadac__nadac`), with RxNorm product and ingredient enrichment.

## Schema

| Column Name | Type | Description |
|------------|------|-------------|
| `ndc11` | string | National Drug Code (NDC) for the priced product. Sourced from the NADAC ndc field. |
| `nadac_description` | string | NADAC description text for the NDC, taken from the most recent NADAC release. |
| `nadac_per_unit` | decimal(15, 5) | National Average Drug Acquisition Cost per unit for this price period. |
| `pricing_unit` | string | Unit of measurement for the NADAC price (typically 'ML', 'GM', or 'EA'). |
| `start_date` | date | Effective start date for this NADAC price (the price's effective_date in the release). |
| `end_date` | date | Effective end date for this NADAC price (the day before the next price's start_date). For the most recent price, this is the most recent release date plus 6 days, covering the week the price was in effect. |
| `is_first_price` | boolean | Boolean flag indicating whether this is the earliest recorded NADAC price for the NDC. |
| `is_last_price` | boolean | Boolean flag indicating whether this is the most recent NADAC price for the NDC. |
| `dollar_change` | decimal(15, 5) | Dollar change from the previous NADAC price to this price. Positive values indicate increases, negative values indicate decreases. Null for the first price. |
| `percent_change` | decimal(15, 5) | Fractional change from the previous NADAC price to this price (dollar_change divided by the previous price). Null for the first price. |
| `previous_nadac_per_unit` | decimal(15, 5) | The NADAC per-unit price from the immediately preceding price period. Null for the first price. |
| `change_type` | integer | Indicator of price direction relative to the previous price: 1 for an increase, 0 for no change, -1 for a decrease, and null for the first price. |
| `ingredient_id` | string | RxNorm RXCUI for the active ingredient of the clinical product. Null if no mapping exists. |
| `ingredient_name` | string | Name of the active ingredient. Null if no mapping exists. |
| `drug_id` | string | RxNorm RXCUI for the product (SBD/BPCK or SCD/GPCK) mapped to this NDC. Null if no mapping exists. |
| `drug_name` | string | RxNorm name (STR) for the product. Null if no mapping exists. |
| `is_brand` | boolean | Boolean flag derived from the NADAC generic/brand indicator: true for brand, false for generic, and null when the indicator is 'unknown'. |
| `clinical_drug_id` | string | RxNorm RXCUI of the related clinical product. Null if no mapping exists. |
| `clinical_drug_name` | string | Name of the related clinical product. Null if no mapping exists. |
| `is_from_current_release` | boolean | Boolean flag indicating whether this price appears in the most recent NADAC release (matched on ndc, price, and effective date). |
| `is_within_30_days` | boolean | Boolean flag indicating whether this price period's end_date is within 30 days of the current date. |
| `is_within_60_days` | boolean | Boolean flag indicating whether this price period's end_date is within 60 days of the current date. |
| `is_within_90_days` | boolean | Boolean flag indicating whether this price period's end_date is within 90 days of the current date. |
| `is_within_180_days` | boolean | Boolean flag indicating whether this price period's end_date is within 180 days of the current date. |
| `is_within_365_days` | boolean | Boolean flag indicating whether this price period's end_date is within 365 days of the current date. |


## Use Cases

- Point-in-time NADAC price lookups using `start_date` / `end_date` windows
- Tracking acquisition-cost increases and decreases over time via change metrics
- Filtering to recent prices with the `is_within_*_days` convenience flags
