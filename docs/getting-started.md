---
title: Getting Started
sidebar_position: 2
---

# Getting Started

Get started with CodeRx in minutes. Subscribe today and get instant access to our comprehensive drug database, weekly-updated data marts, and powerful integration tools.

## Subscribe to CodeRx

Subscribe to CodeRx and get instant access to our comprehensive drug database. Explore weekly-updated data marts and integrate with your existing workflows.

### Subscription Plan

We offer a simple annual pricing plan:

- **Yearly**: $5,500/year — Get access to comprehensive drug data marts with weekly updates, complete RxNorm mappings, rich drug knowledge graphs, and direct access to data marts hosted on AWS S3.

:::tip Ready to Get Started?
**Subscribe to CodeRx today.** Get instant access to our comprehensive drug database with weekly updates, complete RxNorm mappings, and rich drug knowledge graphs. Annual billing available.

**[View Pricing & Subscribe →](/pricing)**
:::

### After Your Subscription

Once you've confirmed your subscription, you'll receive:

- **AWS S3 Access Credentials** - Access key ID and secret access key
- **S3 Bucket Information** - Bucket name and region details
- **Connection Instructions** - Step-by-step setup guide
- **Welcome Email** - Additional resources and documentation links

> **Note**: Access credentials are typically provided within 24 hours of subscription confirmation.

## Accessing Your Data

After receiving your credentials, you can access your data from AWS S3 using Python:

### S3 Bucket Details

- **Bucket Name**: `coderx`
- **Region**: `us-east-1`
- **Format**: CSV and Parquet files organized by data mart folder

### Authentication

You'll receive:
- **Access Key ID**: Your AWS access key
- **Secret Access Key**: Your AWS secret key

Keep these credentials secure and never commit them to version control.

## Querying Data with Python

Here's how to access and query CodeRx data using Python with s3fs:

> **Note**: You'll need to install `s3fs`, `pandas`, and `pyarrow` to work with parquet files. Install them with:
> ```bash
> pip install s3fs pandas pyarrow
> ```

```python
import s3fs
import pandas as pd

# Create filesystem interface
fs = s3fs.S3FileSystem(
    key='YOUR_ACCESS_KEY_ID',
    secret='YOUR_SECRET_ACCESS_KEY'
)

# Read parquet file directly
df = pd.read_parquet(
    's3://coderx/drugs/drugs.parquet',
    filesystem=fs
)

# Filter and analyze
print(df.head())
print(f"Total drugs: {len(df)}")
```

## Data Mart Structure

Your S3 bucket contains the following data marts, each organized in its own folder:

- **[drugs](/concepts/drugs)**/ - Drug products with names, RXCUIs, dose forms
- **[packages](/concepts/packages)**/ - NDC packages with pricing and pack sizes  
- **[ingredients](/concepts/ingredients)**/ - Active and inactive ingredients
- **[classes](/concepts/classes)**/ - Drug classification systems
- **[excipients](/concepts/excipients)**/ - Inactive ingredients with safety data
- **[synonyms](/concepts/synonyms)**/ - Drug name synonyms and aliases

Each data mart folder contains:
- **Latest snapshot**: `{data_mart}/{data_mart}.csv` or `{data_mart}/{data_mart}.parquet` (e.g., `drugs/drugs.parquet`)
- **Dated snapshots**: `{data_mart}/{data_mart}_YYYY-MM-DD.csv` or `{data_mart}/{data_mart}_YYYY-MM-DD.parquet` (e.g., `drugs/drugs_2026-01-16.parquet`)

Files are updated weekly, with new dated snapshots added while the latest file is always updated to point to the most recent data.

## Next Steps

- **[Concepts](/concepts)** - Learn about the data models
- **[Tutorials](/tutorials)** - Step-by-step guides
- **[Data Schema](/erd)** - Explore the database schema

## Support

Need help? Contact us at [support@coderx.io](mailto:support@coderx.io) or visit our [Slack community](https://join.slack.com/t/coderx/shared_invite/zt-5b8e9kr4-PsKAVe4crGmECQyyxDIJgQ).
