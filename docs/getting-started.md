---
title: Getting Started
sidebar_position: 2
---

# Getting Started

Get started with CodeRx in minutes. Subscribe today and get instant access to our comprehensive drug database, weekly-updated data marts, and powerful integration tools.

## Subscribe to CodeRx

Subscribe to CodeRx and get instant access to our comprehensive drug database. Explore weekly-updated data marts and integrate with your existing workflows.

### Subscription Plans

We offer three annual plans:

- **Silver**: Includes the core data marts, weekly updates, and AWS S3 delivery for teams building reliable pharmacy analytics workflows.

- **Gold**: Adds Pricing, Packaging, Label Images, and priority support for organizations that need broader coverage and faster operational execution.

- **Platinum**: Unlocks Indications, Plans, and E-prescribing mappings for advanced clinical use cases and production-grade medication intelligence.

:::tip Ready to Get Started?
**Subscribe to CodeRx today.** Get instant access to our comprehensive drug database with weekly updates, complete RxNorm mappings, and rich drug knowledge graphs. Annual billing available.

**[View Pricing & Book a Demo →](/pricing)**
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

### Authentication

You'll receive:
- **Access Key ID**: Your AWS access key
- **Secret Access Key**: Your AWS secret key
- **S3 Bucket Info**: The address of your AWS s3 bucket

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
    'YOUR_S3_BUCKET/basic/drugs/drugs.parquet',
    filesystem=fs
)

# Filter and analyze
print(df.head())
print(f"Total drugs: {len(df)}")
```

## Data Mart Structure

Your S3 bucket contains the following data marts, organized into `silver/`, `gold/`, and `platinum/` folders:

### Silver

- **[drugs](/concepts/drugs)**/ - Drug products with names, RXCUIs, dose forms
- **[packages](/concepts/packages)**/ - NDC packages with pricing and pack sizes  
- **[ingredients](/concepts/ingredients)**/ - Active and inactive ingredients
- **[classes](/concepts/classes)**/ - Drug classification systems
- **[excipients](/concepts/excipients)**/ - Inactive ingredients with safety data
- **[synonyms](/concepts/synonyms)**/ - Drug name synonyms and aliases

### Gold & Platinum

Gold and Platinum data marts are available with the corresponding subscription tiers. See the [subscription plans](#subscription-plans) for details.

### Version Control

Each data mart folder contains:
- **Latest snapshot**: `{tier}/{data_mart}/{data_mart}.csv` or `{tier}/{data_mart}/{data_mart}.parquet` (e.g., `silver/drugs/drugs.parquet`)
- **Dated snapshots**: `{tier}/{data_mart}/{data_mart}_YYYY-MM-DD.csv` or `{tier}/{data_mart}/{data_mart}_YYYY-MM-DD.parquet` (e.g., `silver/drugs/drugs_2026-01-16.parquet`)

Files are updated weekly, with new dated snapshots added while the latest file is always updated to point to the most recent data.

## Next Steps

- **[Concepts](/concepts)** - Learn about the data models
- **[Tutorials](/tutorials)** - Step-by-step guides

## Support

Need help? Contact us at [support@coderx.io](mailto:support@coderx.io) or visit our [Slack community](https://join.slack.com/t/coderx/shared_invite/zt-5b8e9kr4-PsKAVe4crGmECQyyxDIJgQ).
