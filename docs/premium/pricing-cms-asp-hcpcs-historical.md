---
sidebar_position: 4
unlisted: true
---

# Pricing - CMS ASP HCPCS Historical

Historical CMS Average Sales Price (ASP) pricing for HCPCS J codes, enriched with NDC, package, and RxNorm drug information, tracked over time as a Slowly Changing Dimension Type 2 (SCD2).

## Overview

Each row represents a distinct version of an NDC-to-HCPCS mapping (including its ASP pricing) for a given period. A new version is created whenever any tracked attribute (pricing, crosswalk, or dosage value) changes between quarterly CMS releases. The `effective_date` / `next_effective_date` pair defines the window during which a version was in effect, enabling point-in-time pricing lookups and trend analysis.

Scope is limited to HCPCS J codes (injectable drugs and biologicals reimbursed under Medicare Part B). ASP is derived as `payment_limit / 1.06`. Package and drug attributes are joined from CodeRx packages and drugs tables and may be null when an NDC has no RxNorm mapping.


## Schema

| Column Name | Type | Description |
|------------|------|-------------|
| `ndc11` | string | National Drug Code (NDC) in standardized 11-digit format. Normalized from the source NDC and used to join to package and drug information. |
| `ndc` | string | National Drug Code (NDC) in its original format from the source crosswalk data. |
| `package_description` | string | Text description of the package configuration and contents for this NDC. From int_packages. Null if the NDC has no matching package record. |
| `pack_size` | numeric | Total product quantity contained in the package (e.g., number of tablets, capsules, or milliliters), from int_packages. Null if the NDC has no matching package record. |
| `unit_of_measure` | string | Unit of measurement for the innermost packaging component (e.g., "ML", "EA", "KIT"), from int_packages. Null if the NDC has no matching package record. |
| `active` | boolean | Boolean flag indicating whether the associated drug is currently active in RxNorm. Null if no RxNorm mapping exists. |
| `prescribable` | boolean | Boolean flag indicating whether the associated drug is prescribable according to RxNorm. Null if no RxNorm mapping exists. |
| `drug_id` | string | RxNorm RXCUI for the drug product (SBD/BPCK or SCD/GPCK) associated with this NDC. From int_drugs. Null if no RxNorm mapping exists for this NDC. |
| `drug_name` | string | RxNorm name (STR) for the drug product. From CodeRx drugs table. Null if no RxNorm mapping exists. |
| `is_brand` | boolean | Boolean flag indicating whether the associated drug is a brand product (true) or a clinical/generic product (false). From CodeRx drugs table. |
| `brand_name` | string | Brand name extracted from the drug name for brand products. Null for clinical/generic drugs. From CodeRx drugs table. |
| `available_brand_names` | string | Comma-separated list of active, prescribable brand names available for this clinical drug. Null for brand products themselves. From CodeRx drugs table. |
| `clinical_drug_id` | string | RxNorm RXCUI of the related clinical product. For brand drugs this links to the generic equivalent; for clinical drugs it matches drug_id. From CodeRx drugs table. |
| `clinical_drug_name` | string | Name of the related clinical product. From CodeRx drugs table. |
| `dose_form_name` | string | Name of the dose form (e.g., "Oral Tablet"). For drugs with multiple dose forms this will be "Pack". From CodeRx drugs table. |
| `ingredient_name` | string | Name of the active ingredient(s) for the drug. May be a pipe-delimited string for multi-ingredient products. From CodeRx drugs table. |
| `hcpcs_code` | string | HCPCS code used for billing Medicare Part B drugs. Only J codes are included in this model. Part of the SCD2 business key together with ndc11. |
| `hcpcs_short_description` | string | Short text description of the HCPCS code. From the NDC-HCPCS crosswalk. |
| `hcpcs_labeler_name` | string | Name of the labeler (manufacturer or distributor) associated with this NDC-HCPCS crosswalk record. |
| `hcpcs_drug_name` | string | Drug name associated with this NDC-HCPCS crosswalk record. |
| `hcpcs_dosage` | string | HCPCS dosage description as provided in the source data. May include an "UP TO" qualifier and a dosage amount with units (e.g., "UP TO 10 MG", "5 ML"). |
| `hcpcs_is_up_to` | boolean | Boolean flag indicating whether the HCPCS dosage description contains an "UP TO" qualifier. |
| `hcpcs_dosage_value` | string | Numeric portion extracted from the HCPCS dosage description (e.g., "10" from "UP TO 10 MG"). Commas are removed. May be null if the dosage cannot be parsed. |
| `hcpcs_dosage_unit` | string | Unit of measurement extracted from the HCPCS dosage description (e.g., "MG", "ML"). May be null if the dosage cannot be parsed. |
| `hcpcs_package_size` | string | Package size information for this NDC-HCPCS crosswalk record (crosswalk pkg_size). |
| `hcpcs_package_quantity` | string | Package quantity information for this NDC-HCPCS crosswalk record (crosswalk pkg_qty). |
| `hcpcs_bill_units` | numeric | Billing units for this NDC-HCPCS crosswalk record (crosswalk billunits). |
| `hcpcs_bill_units_per_package` | numeric | Billing units contained in a single package of this NDC (crosswalk billunitspkg). |
| `asp_price` | numeric | Average Sales Price (ASP) for this HCPCS code in the period, calculated as asp_payment_limit / 1.06. Null if the CMS ASP file had no pricing for this HCPCS code in the period. |
| `asp_payment_limit` | numeric | Medicare Part B payment limit for this HCPCS code in the period. The maximum amount Medicare will pay; asp_price is derived from this value. Null if no ASP data exists for the period. |
| `asp_co_insurance_percentage` | numeric | Co-insurance percentage for this HCPCS code (the share of the payment limit the beneficiary is responsible for). Null if no ASP data exists for the period. |
| `asp_vaccine_awp_percentage` | numeric | Vaccine Average Wholesale Price (AWP) percentage. Special pricing rule applied to vaccines, if applicable. Null otherwise or if no ASP data exists. |
| `asp_vaccine_limit` | numeric | Vaccine payment limit. Special payment limit applied to vaccines, if applicable. Null otherwise or if no ASP data exists. |
| `asp_blood_awp_percentage` | numeric | Blood product Average Wholesale Price (AWP) percentage. Special pricing rule applied to blood products, if applicable. Null otherwise or if no ASP data exists. |
| `asp_blood_limit` | numeric | Blood product payment limit. Special payment limit applied to blood products, if applicable. Null otherwise or if no ASP data exists. |
| `asp_clotting_factor` | string | Clotting factor indicator or information. Special designation for clotting factor products, if applicable. Null otherwise or if no ASP data exists. |
| `asp_notes` | string | Additional notes or comments related to this HCPCS code's pricing or special circumstances. Null if no ASP data exists for the period. |
| `effective_date` | date | First day of the CMS quarter (January 1, April 1, July 1, or October 1) on which this version of the NDC-HCPCS mapping and its pricing became effective. |
| `next_effective_date` | date | Effective date of the next version of this NDC-HCPCS mapping. Null for the most recent version. Together with effective_date, defines the validity window for point-in-time lookups (a version is in effect from effective_date up to, but not including, next_effective_date). |
| `is_from_current_release` | boolean | Boolean flag indicating whether this version's payload appears in the latest CMS release ingested. True identifies the currently effective (open) version of the mapping. |


## Use Cases

- Point-in-time Medicare Part B ASP reimbursement lookups for any historical quarter
- Tracking ASP payment-limit trends over time for a HCPCS J code
- Auditing changes to NDC-HCPCS crosswalk mappings across quarterly CMS releases
