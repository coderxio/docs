---
sidebar_position: 1
---

# Packages

Packages represent NDC-to-drug mappings with pricing data and historical price changes.

## Overview

Packages provide a comprehensive view of how National Drug Codes (NDCs) map to specific drug products, along with associated pricing information and historical tracking of price changes over time.

## Schema

| Column Name | Description | Tests |
|------------|-------------|-------|
| `ndc11` | The 11-digit National Drug Code (NDC) format, which uniquely identifies a specific drug package. Includes labeler code, product code, and package code. | `unique`, `not_null` (primary key) |
| `ndc9` | The 9-digit NDC format (first 9 digits of NDC11), representing the product level without package-specific information. | |
| `ndc` | FDA NDC package code. The full NDC package code from FDA data. | |
| `drug_id` | RxNorm RXCUI for the drug associated with this NDC. Null if no RxNorm mapping exists for this NDC. | |
| `drug_name` | The RxNorm drug name associated with this NDC. From the drugs model. | |
| `drug_type` | RxNorm term type for the associated drug. From the drugs model. | |
| `is_brand` | Boolean flag indicating if the associated drug is a brand product. From the drugs model. | |
| `brand_name` | Brand name of the drug, if applicable. From the drugs model. | |
| `clinical_drug_id` | Clinical product RXCUI associated with this NDC. From the drugs model. | |
| `clinical_drug_name` | Clinical product name associated with this NDC. From the drugs model. | |
| `clinical_drug_type` | Clinical product term type. From the drugs model. | |
| `package_description` | FDA package description describing size and type of packaging (e.g., '4 BOTTLES in 1 CARTON/100 TABLETS in 1 BOTTLE'). | |
| `start_marketing_date` | Date when the labeler started marketing this package. | |
| `end_marketing_date` | Date when the package will no longer be available on the market. Null if still being manufactured. | |
| `marketing_category` | Marketing category name (e.g., 'NDA', 'ANDA', 'OTC Monograph'). | |
| `application_number` | FDA application number (NDA, ANDA, or BLA number). For OTC Monograph products, this will be the CFR citation (e.g., 'part 341'). | |
| `labeler_name` | Name of the company/labeler. | |
| `dea_schedule` | DEA schedule classification (CI, CII, CIII, CIV, CV). Null for non-controlled substances. | |
| `deactivation_date` | The date this NDC was deactivated, based on the end date of its most recent historical record in RxNorm. Null if the NDC is not deactivated or has no historical records. | |
| `active` | Boolean flag indicating if the NDC is currently active in RxNorm. | |
| `prescribable` | Boolean flag indicating if the NDC is prescribable according to RxNorm. | |

## Key Features

- **NDC Mapping**: Direct mapping between National Drug Codes and drug products
- **Pricing Data**: Current and historical pricing information for each package
- **Price History**: Track changes in pricing over time to understand market dynamics
- **Product Association**: Link packages to specific drug products and formulations

## Use Cases

- Price tracking and analysis
- Market research and competitive analysis
- Inventory management
- Cost analysis and budgeting
