---
sidebar_position: 7
unlisted: true
---

# Label Images

DailyMed drug label images mapped to NDCs.

## Overview

One row per NDC and label image, with links to view the image and the associated DailyMed Structured Product Label (SPL).

Combines image references extracted from DailyMed SPL XML and image file names, deduplicated via union. Data sourced from `int_dailymed_image_xml_ndcs` and `int_dailymed_image_name_ndcs`, via the `ndcs_to_label_images` model.

## Schema

| Column Name | Type | Description |
|------------|------|-------------|
| `ndc11` | string | National Drug Code (NDC) in standardized 11-digit format. |
| `ndc` | string | National Drug Code (NDC) in its original format from the source data. |
| `image_url` | string | Full URL to view the label image on DailyMed (combines image file name and SPL set ID). |
| `image_file` | string | File name of the label image as referenced in the DailyMed SPL. |
| `set_id` | string | DailyMed SPL set ID identifying the label document the image belongs to. |
| `dailymed_spl_url` | string | Full URL to the DailyMed drug information page (SPL) for this set ID. |


## Use Cases

- Displaying product label images alongside drug data
- Linking NDCs to their DailyMed SPL documentation
- Visual verification of drug products
