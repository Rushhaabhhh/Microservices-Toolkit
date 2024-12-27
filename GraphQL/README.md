# GraphQL Basics to Advanced Guide

## Table of Contents
1. [What is GraphQL?](#what-is-graphql)
2. [Basic Concepts](#basic-concepts)
    - [Schema](#schema)
    - [Types](#types)
    - [Queries](#queries)
    - [Mutations](#mutations)
    - [Resolvers](#resolvers)
3. [Advanced Concepts](#advanced-concepts)
    - [Subscriptions](#subscriptions)
    - [Input Types](#input-types)
    - [Error Handling](#error-handling)
    - [Authentication and Authorization](#authentication-and-authorization)
    - [Schema Stitching and Federation](#schema-stitching-and-federation)
4. [Optimizations](#optimizations)
    - [Batching](#batching)
    - [Caching](#caching)
5. [GraphQL Tools](#graphql-tools)
6. [Best Practices](#best-practices)

---

## What is GraphQL?

GraphQL is a query language for APIs and a runtime for executing those queries. Unlike REST, GraphQL allows clients to request exactly the data they need, providing flexibility and efficiency in data fetching. It simplifies interactions between the frontend and backend by enabling precise and customizable data queries, reducing over-fetching and under-fetching of data.

---

## Basic Concepts

### Schema

A **schema** in GraphQL defines the types of data that are available and specifies how clients can query or mutate data. The schema is written in a type system, which is at the heart of GraphQL.

- **Example:**
    ```graphql
    type User {
        id: ID!
        name: String!
        username: String!
        email: String!
    }
    ```

### Types

In GraphQL, **types** represent the structure of the data. There are three key categories of types:

1. **Scalar Types**: Basic data types like `Int`, `String`, `Boolean`, `Float`, `ID`.
2. **Object Types**: Custom types like `User` or `Todo` that represent entities in your API.
3. **Special Types**: `Query`, `Mutation`, and `Subscription` types define the entry points for fetching and manipulating data.

### Queries

**Queries** are used to fetch data from the server. A query specifies exactly which fields the client wants, and the server will return only that data.

- **Example:**
    ```graphql
    query {
        getUser(id: "1") {
            name
            email
        }
    }
    ```

### Mutations

**Mutations** are used to modify data on the server (create, update, delete). They are similar to queries, but they change data and may return the modified data.

- **Example:**
    ```graphql
    mutation {
        createUser(name: "John", email: "john@example.com") {
            id
            name
        }
    }
    ```

### Resolvers

**Resolvers** are functions that resolve the queries and mutations. They contain the logic to retrieve or modify the data. A resolver corresponds to a specific field in the schema.

- **Example:**
    ```javascript
    const resolvers = {
      Query: {
        getUser: (parent, args) => {
          return users.find(user => user.id === args.id);
        }
      }
    }
    ```

---

## Advanced Concepts

### Subscriptions

**Subscriptions** allow clients to receive real-time updates from the server. They are typically used in applications that need real-time features, like messaging apps or live data feeds.

- **Example:**
    ```graphql
    subscription {
        newMessage {
            content
            sender
        }
    }
    ```

### Input Types

**Input Types** are used to pass complex objects as arguments to queries and mutations. These allow for more structured data to be passed into the server.

- **Example:**
    ```graphql
    input UserInput {
        name: String!
        email: String!
    }
    ```

### Error Handling

GraphQL provides a standard way of handling errors. If a query or mutation encounters an error, GraphQL will return an error object with a message.

- **Example Response:**
    ```json
    {
        "errors": [
            {
                "message": "User not found",
                "path": ["getUser"]
            }
        ]
    }
    ```

### Authentication and Authorization

GraphQL APIs often require user authentication and authorization. Tokens (like JWT) are commonly used for this. You can protect resolvers by checking the user's authentication status.

- **Example:**
    ```javascript
    const resolvers = {
      Query: {
        getUser: (parent, args, context) => {
          if (!context.user) {
            throw new Error('Not authenticated');
          }
          return users.find(user => user.id === args.id);
        }
      }
    }
    ```

### Schema Stitching and Federation

**Schema Stitching** allows combining multiple GraphQL schemas into a single schema, useful in microservices architectures. **Federation** is an approach to split the schema into separate services that can be composed into one unified schema.

---

## Optimizations

### Batching

**Batching** is a technique where multiple requests are combined into one, reducing the number of requests to the server. Tools like Apollo's DataLoader help optimize database queries by batching requests.

### Caching

**Caching** allows storing responses so that frequently requested data doesn't need to be fetched from the database every time. GraphQL caching can be done at the resolver level or using external caching mechanisms.

---

## GraphQL Tools

- **Apollo Server**: A popular GraphQL server implementation for building APIs.
- **Apollo Client**: A client for interacting with GraphQL APIs in JavaScript-based apps.
- **GraphiQL/GraphQL Playground**: Interactive tools for testing GraphQL queries and mutations.
