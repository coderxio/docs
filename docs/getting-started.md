---
title: Getting Started
sidebar_position: 2
---

# Getting Started

Welcome! This guide will walk you through subscribing to CodeRx and accessing your pharmaceutical data.

## Subscription

CodeRx is available as an annual subscription starting at **$5,500/year**. This gives you access to weekly-updated drug data marts hosted on AWS S3.

### Payment

To subscribe, complete payment through our secure Stripe checkout:

:::tip Subscribe Now
**Ready to get started?** Complete your subscription through our secure Stripe checkout to access CodeRx's comprehensive drug database with daily NDC updates, complete RxNorm mappings, and rich drug knowledge graphs.

**[Subscribe Now →](https://buy.stripe.com/6oUfZh6B53YzbtE9s0gEg01)**
:::

Once your payment is confirmed, you'll receive:

- **AWS S3 Access Credentials** - Access key ID and secret access key
- **S3 Bucket Information** - Bucket name and region details
- **Connection Instructions** - Step-by-step setup guide
- **Welcome Email** - Additional resources and documentation links

> **Note**: Access credentials are typically provided within 24 hours of payment confirmation.

## Accessing Your Data

After receiving your credentials, you can access your data from AWS S3 in several ways:

### S3 Bucket Details

- **Bucket Name**: `coderx-drug-data`
- **Region**: `us-east-1`
- **Format**: Parquet files organized by data mart and date

### Authentication

You'll receive:
- **Access Key ID**: Your AWS access key
- **Secret Access Key**: Your AWS secret key

Keep these credentials secure and never commit them to version control.

## Querying Data with Python

Here are examples of how to access and query CodeRx data using Python:

### Option 1: Using boto3 and pandas

```python
import boto3
import pandas as pd
from io import BytesIO

# Configure S3 client
s3_client = boto3.client(
    's3',
    aws_access_key_id='YOUR_ACCESS_KEY_ID',
    aws_secret_access_key='YOUR_SECRET_ACCESS_KEY',
    region_name='us-east-1'
)

# List available files
bucket = 'coderx-drug-data'
response = s3_client.list_objects_v2(Bucket=bucket, Prefix='drugs/')
files = [obj['Key'] for obj in response.get('Contents', [])]

# Read a parquet file
obj = s3_client.get_object(Bucket=bucket, Key='drugs/drugs_2024-01-15.parquet')
df = pd.read_parquet(BytesIO(obj['Body'].read()))

# Query the data
atorvastatin = df[df['name'].str.contains('atorvastatin', case=False)]
print(atorvastatin[['name', 'rxcui', 'dose_form']])
```

### Option 2: Using s3fs (Simpler approach)

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
    's3://coderx-drug-data/drugs/drugs_2024-01-15.parquet',
    filesystem=fs
)

# Filter and analyze
print(df.head())
print(f"Total drugs: {len(df)}")
```

### Option 3: Using DuckDB (SQL queries)

```python
import duckdb
import s3fs

# Set up S3 access
fs = s3fs.S3FileSystem(
    key='YOUR_ACCESS_KEY_ID',
    secret='YOUR_SECRET_ACCESS_KEY'
)

# Enable S3 extension and query
conn = duckdb.connect()
conn.execute("INSTALL httpfs;")
conn.execute("LOAD httpfs;")
conn.execute(f"SET s3_access_key_id='YOUR_ACCESS_KEY_ID'")
conn.execute(f"SET s3_secret_access_key='YOUR_SECRET_ACCESS_KEY'")

# Query with SQL
query = """
SELECT name, rxcui, dose_form, brand_names
FROM read_parquet('s3://coderx-drug-data/drugs/drugs_2024-01-15.parquet')
WHERE name LIKE '%atorvastatin%'
LIMIT 10
"""
results = conn.execute(query).fetchdf()
print(results)
```

## Using with Data Warehouses

### Snowflake

Load CodeRx data into Snowflake for powerful analytics:

```sql
-- Create external stage
CREATE STAGE coderx_stage
  URL = 's3://coderx-drug-data/'
  CREDENTIALS = (
    AWS_KEY_ID = 'YOUR_ACCESS_KEY_ID'
    AWS_SECRET_KEY = 'YOUR_SECRET_ACCESS_KEY'
  );

-- Create external table
CREATE EXTERNAL TABLE drugs_external (
  name VARCHAR,
  rxcui NUMBER,
  dose_form VARCHAR,
  brand_names VARCHAR
)
WITH LOCATION = @coderx_stage/drugs/
FILE_FORMAT = (TYPE = PARQUET);

-- Query the data
SELECT * FROM drugs_external
WHERE name LIKE '%atorvastatin%';
```

### BigQuery

Access CodeRx data directly from BigQuery:

```sql
-- Create external table connection
CREATE OR REPLACE EXTERNAL TABLE `your_project.coderx.drugs`
OPTIONS (
  format = 'PARQUET',
  uris = ['gs://your-gcs-bucket/drugs/*.parquet']
);

-- Query the data
SELECT name, rxcui, dose_form
FROM `your_project.coderx.drugs`
WHERE name LIKE '%atorvastatin%';
```

> **Note**: For BigQuery, you may need to copy files from S3 to Google Cloud Storage first, or use a data integration tool.

### Redshift

Query CodeRx data using Amazon Redshift Spectrum:

```sql
-- Create external schema
CREATE EXTERNAL SCHEMA coderx
FROM DATA CATALOG
DATABASE 'coderx'
IAM_ROLE 'arn:aws:iam::YOUR_ACCOUNT:role/RedshiftSpectrumRole'
CREATE EXTERNAL DATABASE IF NOT EXISTS;

-- Query external table
SELECT name, rxcui, dose_form
FROM coderx.drugs
WHERE name LIKE '%atorvastatin%';
```

## Data Mart Structure

Your S3 bucket contains the following data marts:

- **drugs/** - Drug products with names, RXCUIs, dose forms
- **packages/** - NDC packages with pricing and pack sizes  
- **ingredients/** - Active and inactive ingredients
- **classes/** - Drug classification systems
- **excipients/** - Inactive ingredients with safety data
- **synonyms/** - Drug name synonyms and aliases

Each data mart includes:
- Weekly snapshots (dated parquet files)
- Latest snapshot (symlink to most recent)

## Next Steps

- **[Concepts](/concepts/classes)** - Learn about the data models
- **[Tutorials](/tutorials/working-with-packages)** - Step-by-step guides
- **[Data Schema](/erd)** - Explore the database schema

## Support

Need help? Contact us at [support@coderx.io](mailto:support@coderx.io) or visit our [Slack community](https://join.slack.com/t/coderx/shared_invite/zt-5b8e9kr4-PsKAVe4crGmECQyyxDIJgQ).
