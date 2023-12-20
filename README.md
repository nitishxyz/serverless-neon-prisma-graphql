# serverles-neon-prisma-graphql

A work in progress project for building a serverless GraphQL API with NeonDB and PostgreSQL.

## Description

This project aims to demonstrate how to build a serverless GraphQL API using Apollo Server as the data layer and NeonDB PostgreSQL as the database. It leverages the power of serverless architecture to provide a scalable and cost-effective solution for GraphQL-based applications.

## Features

- Serverless architecture using AWS Lambda
- GraphQL API powered by Apollo Server
- NeonDB PostgreSQL database for data storage
- Prisma ORM for data modeling and migrations

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/your-repo.git`
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory and add the following environment variables:

```
DATABASE_URL=postgres://user:password@host-pooler:port/database
DIRECT_DATABASE_URL=postgres://user:password@host:port/database
```

4. Setup Repository Secrets in GitHub for the following environment variables:

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
ENV (this will contain all the environment variables from .env file)
```

ENV variable should be in the following format:

```
PRISMA_CLI_BINARY_TARGETS=native,rhel-openssl-1.0.x

DATABASE_URL=postgres://user:password@host-pooler:port/database
DIRECT_DATABASE_URL=postgres://user:password@host:port/database
```

5. Deploy the project to AWS Lambda: `npm run deploy` OR push to the `main` branch to trigger a GitHub Action that will deploy the project to AWS Lambda.

## DEMO

Demo: https://345g5ydhzd.execute-api.ap-south-1.amazonaws.com/
