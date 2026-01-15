---
sidebar_position: 6
---

# Synonyms

Synonyms provide multi-source synonym aggregation for improved search and matching.

## Overview

Synonyms aggregate alternative names, brand names, and common identifiers from multiple sources to improve search capabilities and enable better matching across different data sources and systems.

## Schema

| Column Name | Description | Tests |
|------------|-------------|-------|
| `drug_id` | RxNorm RXCUI identifier for the drug product. Can be either a brand product (SBD/BPCK) or clinical product (SCD/GPCK). References product-level RxNorm concepts. | `not_null` |
| `synonym` | Alternative name or synonym for the drug. Format and content vary by source: RXNORM includes PSN (prescribable name), SY (synonym), TMSY (tall man synonym), and ET (entry term) from RxNorm; NADAC includes NDC description text from the NADAC dataset; FDA includes formatted product name combining nonproprietary name, strength, dosage form, and proprietary name (brand name) if available. | |
| `source` | Source system for the synonym. Allowable values are: 'RXNORM' (From RxNorm concept synonyms), 'NADAC' (From National Average Drug Acquisition Cost descriptions), 'FDA' (From FDA NDC Directory product listings). | `accepted_values: ['RXNORM', 'NADAC', 'FDA']` |

## Key Features

- **Multi-Source Aggregation**: Combine synonyms from various authoritative sources
- **Brand Name Variations**: Track different brand names and variations
- **Common Names**: Include common or colloquial names for drugs
- **Search Enhancement**: Improve search results through comprehensive synonym coverage
- **Matching Algorithms**: Support for fuzzy matching and cross-reference lookups

## Use Cases

- Enhanced search functionality
- Data integration and matching
- Cross-system interoperability
- User-friendly product discovery
- Brand name resolution
