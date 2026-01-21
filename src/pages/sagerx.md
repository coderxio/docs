---
title: SageRx
---

# 🌿 SageRx

Open drug data pipelines curated by pharmacists.

:::tip Looking for CodeRx Documentation?
**SageRx is the open-source foundation that powers CodeRx.** If you're looking for documentation on how to use the CodeRx Drug Database, data marts, and APIs, check out our main documentation.

**[View CodeRx Documentation →](/docs)**
:::

## Features

- **Automated loading of open drug data** - One-click pipelines that automatically extract up-to-the-day current data
- **Custom data transformation** - Transform raw data into something greater than the sum of its parts
- **Data marts specific to pharmacy domain** - Curated data structures designed for pharmaceutical analytics
- **Curated by community of pharmacists** - Built and maintained by experts in the field

## About

SageRx is a platform of one-click open drug data pipelines that can automatically:
1. **Extract** up-to-the-day current data
2. **Load** it all into a common database so it's easier to work with
3. **Transform** it into something greater than the sum of its parts

The original "napkin drawing" vision of SageRx was to create a comprehensive, open-source foundation for working with pharmaceutical data—making it accessible, standardized, and ready for analysis.

## Open Source Foundation

All of the SageRx data pipelines that have been used to create the data marts published quarterly for free over the past year **will remain open source forever**. These pipelines will continue to be maintained and enhanced, serving as the foundation for pharmaceutical data processing.

### Why Keep SageRx Open Source?

SageRx represents the core infrastructure and data processing pipelines that transform raw pharmaceutical data into structured, usable formats. By keeping this foundation open source, we ensure:

- **Transparency** - Anyone can see how the data is processed and transformed
- **Community contribution** - Pharmacists and developers can improve and extend the pipelines
- **Reproducibility** - Researchers and organizations can verify and replicate data transformations
- **Long-term sustainability** - The community can maintain and evolve the core infrastructure

### CodeRx Drug Database: Built on SageRx

The CodeRx Drug Database is built entirely on the foundation of SageRx and depends on it. What makes the CodeRx Drug Database different is that it provides a more cohesive package of drug data in a format optimized for analytics and software development—the "last mile" of data delivery.

This last-mile packaging includes:
- **Pre-processed data marts** - Ready-to-use data structures
- **Weekly updates** - Automated, regular data refreshes
- **Direct S3 access** - Simple integration with existing workflows
- **Optimized formats** - CSV and Parquet files organized for analytics

For now, this packaging layer remains private as we explore the market and validate the need for this service. We may change our approach and re-integrate it with SageRx in the future, but for now, we need a small moat to test market viability.

**The important thing**: The core SageRx pipelines that power everything remain open source and will continue to be available to everyone.

## GitHub Repository

**[sagerx](https://github.com/coderxio/sagerx)**
