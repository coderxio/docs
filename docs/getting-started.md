---
title: Getting Started
sidebar_position: 2
---

# Getting Started

Get started with CodeRx in minutes. Start your **30-day free trial** today and explore everything risk-free. You won't be charged until after your trial period ends—cancel anytime during the trial with no obligation.

## Start Your Free Trial

Every CodeRx subscription comes with a **full 30-day free trial**. Explore our comprehensive drug database, access weekly-updated data marts, and integrate with your existing workflows—all free for 30 days. Your card won't be charged until the trial ends, and you can cancel anytime during the trial period.

### Flexible Billing Options

We offer two simple pricing plans to fit your needs:

- **Monthly**: $550/month — Perfect if you want flexibility or are testing the waters
- **Yearly**: $5,500/year — Best value if you're committed long-term

Both plans include the same features and data access: weekly updates, complete RxNorm mappings, rich drug knowledge graphs, and direct access to data marts hosted on AWS S3. The only difference is how you're billed.

:::tip Ready to Get Started?
**Start your 30-day free trial today.** Try CodeRx's comprehensive drug database free for 30 days—you won't be charged until after your trial ends. Choose between monthly or yearly billing when you subscribe.

**[View Pricing & Start Free Trial →](/pricing)**
:::

### After Your Trial or Subscription

Once you've started your free trial or confirmed your subscription, you'll receive:

- **AWS S3 Access Credentials** - Access key ID and secret access key
- **S3 Bucket Information** - Bucket name and region details
- **Connection Instructions** - Step-by-step setup guide
- **Welcome Email** - Additional resources and documentation links

> **Note**: Access credentials are typically provided within 24 hours of starting your free trial or subscription confirmation.

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

- **[Concepts](/concepts/classes)** - Learn about the data models
- **[Tutorials](/tutorials/working-with-packages)** - Step-by-step guides
- **[Data Schema](/erd)** - Explore the database schema

## Support

Need help? Contact us at [support@coderx.io](mailto:support@coderx.io) or visit our [Slack community](https://join.slack.com/t/coderx/shared_invite/zt-5b8e9kr4-PsKAVe4crGmECQyyxDIJgQ).
