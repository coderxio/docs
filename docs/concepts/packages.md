---
sidebar_position: 1
---

# Packages

Packages represent NDC-to-drug mappings with pricing data and historical price changes.

## Overview

Packages provide a comprehensive view of how National Drug Codes (NDCs) map to specific drug products, along with associated pricing information and historical tracking of price changes over time. Includes 11-digit, 10-digit (hyphenated), and 9-digit NDC formats.

## Schema

| Column Name | Description | Tests |
|------------|-------------|-------|
| `ndc11` | The 11-digit National Drug Code (NDC) format, which uniquely identifies a specific drug package. Includes labeler code, product code, and package code. | `unique`, `not_null` (primary key) |
| `ndc10` | Hyphenated NDC10 package code when available (e.g., "12345-678-90"). From all_ndc_descriptions; preferentially RxNorm MTHSPL, otherwise FDA ndcpackagecode. Null when no NDC10 mapping exists. | |
| `ndc9` | The 9-digit NDC format (first 9 digits of NDC11), representing the product level without package-specific information. | |
| `ndc` | Hyphenated NDC10 package code, same value as ndc10. Retained for backward compatibility with consumers that expect a column named ndc. | |
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
| `fda_description` | FDA-derived product description cobbled together from FDA columns (e.g. nonproprietary name, strength, dosage form, proprietary name) when no normalized FDA description exists. From all_ndc_descriptions. Null if the NDC has no FDA source mapping. | |
| `is_src_rxnorm_historical` | Boolean flag indicating if this NDC appears in RxNorm Historical NDC data. An NDC may be present in multiple sources; this flag is independent of the other is_src_* flags. From all_ndcs_to_sources. | |
| `is_src_rxnorm` | Boolean flag indicating if this NDC appears in current RxNorm NDC data. An NDC may be present in multiple sources; this flag is independent of the other is_src_* flags. From all_ndcs_to_sources. | |
| `is_src_fda_ndc` | Boolean flag indicating if this NDC appears in the FDA NDC Directory (active product and package listings). An NDC may be present in multiple sources; this flag is independent of the other is_src_* flags. From all_ndcs_to_sources. | |
| `is_src_fda_excluded` | Boolean flag indicating if this NDC appears in FDA Excluded listings — products or packages removed/excluded from the NDC Directory (e.g. failure to respond to FDA correction requests, expired listing certification, or FDA inactivation). An NDC may be present in multiple sources; this flag is independent of the other is_src_* flags. From all_ndcs_to_sources. | |
| `is_src_fda_unfinished` | Boolean flag indicating if this NDC appears in FDA Unfinished drug listings (active pharmaceutical ingredients, drugs for further processing, and bulk drug substances for compounding). An NDC may be present in multiple sources; this flag is independent of the other is_src_* flags. From all_ndcs_to_sources. | |
| `is_src_fda_compounded` | Boolean flag indicating if this NDC appears in the FDA Compounding NDC Directory (human drug products compounded by outsourcing facilities). An NDC may be present in multiple sources; this flag is independent of the other is_src_* flags. From all_ndcs_to_sources. | |
| `deactivation_date` | The date this NDC was deactivated, based on the end date of its most recent historical record in RxNorm. Null if the NDC is not deactivated or has no historical records. | |
| `active` | Boolean flag indicating if the NDC is currently active in RxNorm.  | |
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
