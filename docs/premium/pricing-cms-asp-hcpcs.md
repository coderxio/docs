---
sidebar_position: 3
unlisted: true
---

# Pricing - CMS ASP HCPCS

Current CMS Average Sales Price (ASP) pricing for HCPCS J codes, enriched with NDC, package, and RxNorm drug information.

## Overview

This is the point-in-time (non-historical) companion to `pricing__cms_asp_hcpcs_historical` and reflects only the most recent CMS ASP and NDC-HCPCS crosswalk data.

Scope is limited to HCPCS J codes (injectable drugs and biologicals reimbursed under Medicare Part B). ASP is derived as `payment_limit / 1.06`. Package and drug attributes are joined from `int_packages` and `int_drugs` and may be null when an NDC has no RxNorm mapping.

Data sourced from `stg_cms__ndc_hcpcs_crosswalk`, `stg_cms__hcpcs`, `stg_cms__asp`, `int_packages`, and `int_drugs`, via `int_hcpcs_to_asp_to_rxcui`.

## Schema

| Column Name | Type | Description |
|------------|------|-------------|
| `ndc11` | string | National Drug Code (NDC) in standardized 11-digit format. |
| `ndc` | string | National Drug Code (NDC) in its original format from the source crosswalk data. |
| `package_description` | string | Text description of the package configuration and contents for this NDC. From int_packages. |
| `pack_size` | numeric | Total product quantity contained in the package. From int_packages. |
| `unit_of_measure` | string | Unit of measurement for the innermost packaging component. From int_packages. |
| `active` | boolean | Boolean flag indicating whether the associated drug is currently active in RxNorm. |
| `prescribable` | boolean | Boolean flag indicating whether the associated drug is prescribable according to RxNorm. |
| `drug_id` | string | RxNorm RXCUI for the drug product associated with this NDC. From int_drugs. Null if no RxNorm mapping exists. |
| `drug_name` | string | RxNorm name (STR) for the drug product. From int_drugs. |
| `is_brand` | boolean | Boolean flag indicating whether the associated drug is a brand product. From int_drugs. |
| `brand_name` | string | Brand name extracted from the drug name for brand products. Null for clinical/generic drugs. |
| `available_brand_names` | string | Comma-separated list of active, prescribable brand names available for this clinical drug. Null for brand products themselves. |
| `clinical_drug_id` | string | RxNorm RXCUI of the related clinical product. From int_drugs. |
| `clinical_drug_name` | string | Name of the related clinical product. From int_drugs. |
| `dose_form_name` | string | Name of the dose form (e.g., "Oral Tablet"). "Pack" for drugs with multiple dose forms. |
| `ingredient_name` | string | Name of the active ingredient(s) for the drug. From int_drugs. |
| `hcpcs_code` | string | HCPCS code used for billing Medicare Part B drugs. Only J codes are included in this model. |
| `hcpcs_long_description` | string | Long text description of the HCPCS code. From stg_cms__hcpcs. |
| `hcpcs_short_description` | string | Short text description of the HCPCS code. From the NDC-HCPCS crosswalk. |
| `hcpcs_labeler_name` | string | Name of the labeler associated with this NDC-HCPCS crosswalk record. |
| `hcpcs_drug_name` | string | Drug name associated with this NDC-HCPCS crosswalk record. |
| `hcpcs_dosage` | string | HCPCS dosage description as provided in the source data. May include an "UP TO" qualifier and a dosage amount with units. |
| `hcpcs_is_up_to` | boolean | Boolean flag indicating whether the HCPCS dosage description contains an "UP TO" qualifier. |
| `hcpcs_dosage_value` | string | Numeric portion extracted from the HCPCS dosage description. May be null if it cannot be parsed. |
| `hcpcs_dosage_unit` | string | Unit of measurement extracted from the HCPCS dosage description. May be null if it cannot be parsed. |
| `hcpcs_package_size` | string | Package size information for this NDC-HCPCS crosswalk record (crosswalk pkg_size). |
| `hcpcs_package_quantity` | string | Package quantity information for this NDC-HCPCS crosswalk record (crosswalk pkg_qty). |
| `hcpcs_bill_units` | numeric | Billing units for this NDC-HCPCS crosswalk record (crosswalk billunits). |
| `hcpcs_bill_units_per_package` | numeric | Billing units contained in a single package of this NDC (crosswalk billunitspkg). |
| `hcpcs_add_date` | date | Date the HCPCS code was added, from stg_cms__hcpcs. |
| `hcpcs_act_eff_date` | date | Action effective date for the HCPCS code, from stg_cms__hcpcs. |
| `hcpcs_term_date` | date | Termination date for the HCPCS code, from stg_cms__hcpcs. Null if not terminated. |
| `asp_price` | numeric | Average Sales Price (ASP), calculated as asp_payment_limit / 1.06. Null if no ASP data exists. |
| `asp_payment_limit` | numeric | Medicare Part B payment limit for this HCPCS code. Null if no ASP data exists. |
| `asp_co_insurance_percentage` | numeric | Co-insurance percentage for this HCPCS code. Null if no ASP data exists. |
| `asp_vaccine_awp_percentage` | numeric | Vaccine AWP percentage. Special pricing rule applied to vaccines, if applicable. |
| `asp_vaccine_limit` | numeric | Vaccine payment limit. Special payment limit applied to vaccines, if applicable. |
| `asp_blood_awp_percentage` | numeric | Blood product AWP percentage. Special pricing rule applied to blood products, if applicable. |
| `asp_blood_limit` | numeric | Blood product payment limit. Special payment limit applied to blood products, if applicable. |
| `asp_clotting_factor` | string | Clotting factor indicator or information. Special designation for clotting factor products. |
| `asp_notes` | string | Additional notes or comments related to this HCPCS code's pricing or special circumstances. |


## Use Cases

- Looking up current Medicare Part B ASP reimbursement for injectable drugs
- Mapping HCPCS J codes to NDCs and RxNorm drug products
- Calculating billing-unit-based reimbursement for Part B drugs
