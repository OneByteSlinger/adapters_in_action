# AWS Database Adapter Repository

## Table of Contents

-   [AWS Database Adapter Repository](#aws-database-adapter-repository)
    -   [Table of Contents](#table-of-contents)
    -   [Introduction](#introduction)
    -   [What is CRUDL?](#what-is-crudl)
    -   [Why Use a Generic Database Adapter?](#why-use-a-generic-database-adapter)
    -   [Getting Started](#getting-started)
        -   [Prerequisites](#prerequisites)
        -   [Installation](#installation)
    -   [Usage](#usage)
        -   [Aurora](#aurora)
        -   [DynamoDB](#dynamodb)
        -   [RDS](#rds)
        -   [Redshift](#redshift)
    -   [Deatils](#deatils)
        -   [1. RDSService (rdsAdapter.ts)](#1-rdsservice-rdsadapterts)
        -   [2. RedshiftService (redshiftAdapter.ts)](#2-redshiftservice-redshiftadapterts)
        -   [3. DynamoDBService (dynamoAdapter.ts)](#3-dynamodbservice-dynamoadapterts)
        -   [4. AuroraService (auroraAdapter.ts)](#4-auroraservice-auroraadapterts)
        -   [3. AuroraAdapter (aurora_index.ts)](#3-auroraadapter-aurora_indexts)
        -   [4. DynamoDBAdapter (dynamo_index.ts)](#4-dynamodbadapter-dynamo_indexts)
        -   [5. RDSAdapter (rds_index.ts)](#5-rdsadapter-rds_indexts)
        -   [6. RedshiftAdapter (redshift_index.ts)](#6-redshiftadapter-redshift_indexts)

## Introduction

This repository provides a set of generic database adapters for various AWS services including Aurora, DynamoDB, RDS, and Redshift. By leveraging TypeScript's powerful type system, these adapters allow for cleaner, more elegant, and type-safe database operations.

## What is CRUDL?

CREATE (one record), READ (one record), UPDATE (one record), DELETE (one reocord), LIST (all records with optional pagination)

## Why Use a Generic Database Adapter?

-   **Consistency Across Databases**: Using a generic adapter ensures that the interaction with different databases remains consistent. This makes it easier to switch between different databases or add new ones.
-   **Type Safety**: With TypeScript, we can ensure that the data we're working with matches the expected types, reducing runtime errors.
-   **Cleaner Code**: By abstracting away the specifics of each database, the code becomes cleaner and easier to maintain. This abstraction also reduces the repetition of code.
-   **Scalability**: As our application grows, we might need to switch databases or use multiple databases. A generic adapter makes this process seamless.
-   **Easier Testing**: A consistent interface means we can mock the database layer more easily, leading to more robust unit tests.

## Getting Started

### Prerequisites

-   Node.js
-   AWS SDK

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-repo-link.git
```

## Usage

Here's how we can use the adapters for each database: (**client folder**)

### Aurora

```typescript
import AuroraAdapter from './adapters/auroraAdapter';
// ... rest of the code
```

### DynamoDB

```typescript
import DynamoDBAdapter from './adapters/dynamoDBAdapter';
// ... rest of the code
```

### RDS

```typescript
import RDSAdapter from './adapters/rdsAdapter';
// ... rest of the code
```

### Redshift

```typescript
import RedshiftAdapter from './adapters/redshiftAdapter';
// ... rest of the code
```

## Deatils

### 1. RDSService (rdsAdapter.ts)

**Purpose**:
This adapter is designed to interact with AWS's Relational Database Service (RDS), specifically with PostgreSQL given the use of the pg library.

**Functionality**:

1. **Initialisation**: On instantiation, it sets up a connection pool to the PostgreSQL database using the provided configuration.
2. **CRUDL Operations**:

    - create: Inserts a new record into the specified table.
    - read: Fetches a record by its ID from the specified table.
    - update: Updates a record by its ID in the specified table.
    - delete: Deletes a record by its ID from the specified table.
    - list: Lists records with optional pagination from the specified table.

### 2. RedshiftService (redshiftAdapter.ts)

**Purpose**:
This adapter is for Amazon Redshift, a fully managed data warehouse service in the cloud.

**Functionality**:

1. **Initialisation**: Sets up a client to interact with Redshift using the provided configuration.
2. **CRUDL Operations**:

    - create: Inserts a new item into the specified table.
    - read: Fetches an item by its primary key from the specified table.
    - update: Modifies an existing item's attributes in the specified table.
    - delete: Deletes an item by its primary key from the specified table.
    - list: Retrieves all items from the specified table with optional filtering.

### 3. DynamoDBService (dynamoAdapter.ts)

**Purpose**:
This adapter is designed to interact with Amazon DynamoDB, a managed NoSQL database service provided by AWS.

**Functionality**:

1. **Initialisation**: On instantiation, it sets up a connection to the DynamoDB service using the provided AWS SDK configuration.
2. **CRUDL Operations**:
    - create: Inserts a new item into the specified table.
    - read: Fetches an item by its primary key from the specified table.
    - update: Modifies an existing item's attributes in the specified table.
    - delete: Deletes an item by its primary key from the specified table.
    - list: Retrieves all items from the specified table with optional filtering.

### 4. AuroraService (auroraAdapter.ts)

**Purpose**:
This adapter is designed to interact with Amazon Aurora, a relational database service that combines the speed and availability of high-end commercial databases with the simplicity and cost-effectiveness of open-source databases.

**Functionality**:

1. **Initialisation**: On instantiation, it establishes a connection to the Aurora database cluster using the provided configuration.
2. **CRUDL Operations**:
    - create: Inserts a new record into the specified schema and table.
    - read: Fetches a record by its primary key from the specified table.
    - update: Modifies an existing record's attributes in the specified table.
    - delete: Deletes a record by its primary key from the specified table.
    - list: Retrieves all records from the specified table with optional filtering and pagination.

### 3. AuroraAdapter (aurora_index.ts)

**Purpose**:
This file demonstrates how to use a AuroraAdapter to interact with Amazon Aurora, a MySQL and PostgreSQL-compatible relational database built for the cloud.

**Functionality**:

1. **Configuration**: Provides configurations for different tables (customer_table and customer_user_table).
2. **CRUDL Operations**: Demonstrates CRUDL operations for Customer and CustomerUser entities using the AuroraAdapter.

### 4. DynamoDBAdapter (dynamo_index.ts)

**Purpose**:
This file showcases the usage of a DynamoDBAdapter to interact with Amazon DynamoDB, a NoSQL database service.

**Functionality**:

1. **Initialisation**: Sets up a generic DynamoDB service without specific table configurations.
2. **CRUDL Operations**: Demonstrates CRUDL operations for Customer and CustomerUser entities using the DynamoDBAdapter. Each service can be used for multiple tables in a DynamoDB instance.

### 5. RDSAdapter (rds_index.ts)

**Purpose**:
This file demonstrates how to use the RDSService to interact with RDS.

**Functionality**:

1. **Configuration**: Provides configurations for different tables (customer_table and customer_user_table).
2. **CRUDL Operations**: Demonstrates CRUDL operations for Customer and CustomerUser entities using the RDSAdapter.

### 6. RedshiftAdapter (redshift_index.ts)

**Purpose**:
This file showcases the usage of the RedshiftService to interact with Amazon Redshift.

**Functionality**:

1. **Configuration**: Provides configurations for different tables (customer_table and customer_user_table).
2. **CRUDL Operations**: Demonstrates CRUDL operations for Customer and CustomerUser entities using the RedshiftAdapter.

In summary, each adapter is tailored to interact with a specific AWS database service. They abstract the intricacies of each database, providing a consistent interface for CRUDL operations. This design promotes cleaner code, easier maintenance, and the flexibility to switch or integrate different databases with minimal friction.
