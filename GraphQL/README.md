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

## GraphQL - http vs Apollo Server 

### 1.  graphql-http server

`graphql-http` is a minimalistic, protocol-compliant GraphQL server implementation for handling HTTP requests.

#### Key Features :
- **Lightweight and Minimal:** Focuses purely on handling GraphQL over HTTP without any extras.
- **Specification-Compliant:** Adheres to the GraphQL over HTTP specification, ensuring compatibility.
- **Flexibility:** Doesn't enforce any specific frameworks or middleware—can be integrated with various HTTP servers (e.g., `http`, `express`, `fastify`).
- **Streaming Support:** Supports GraphQL over HTTP multipart responses and `application/graphql+json` for subscriptions and live queries.
- **Middleware Agnostic:** You choose how to wire it into your existing HTTP stack.

#### Use Cases :
- When you need a lightweight solution for GraphQL without additional features.
- For custom GraphQL setups where you want to control every aspect of the server.
- For performance-sensitive applications requiring minimal overhead.

#### Advantages :
- Highly customizable.
- Minimal dependencies.
- Adherence to standards ensures compatibility with clients like Apollo or Relay.

#### Drawbacks :
- No built-in support for advanced features like caching, schema stitching, or federations.
- Requires additional libraries or custom implementations for complex needs like authentication, logging, or monitoring.

---

### **2. Apollo Server**

Apollo Server is a comprehensive GraphQL server solution that comes with built-in features for modern GraphQL application needs.

#### Key Features :
- **Schema First Development:** Includes tools like `typeDefs` and `resolvers` for building schemas.
- **Data Sources:** Supports integration with REST APIs and other data sources out of the box.
- **Subscriptions:** Built-in support for WebSocket-based GraphQL subscriptions.
- **Apollo Federation:** Enables schema stitching and federated GraphQL services for microservices architecture.
- **Advanced Features:** Includes caching, tracing, monitoring, and error handling integrations (e.g., Apollo Studio).
- **Middleware Ready:** Works seamlessly with frameworks like Express, Koa, and Fastify.

#### Use Cases :
- When you want an opinionated and feature-rich GraphQL server out of the box.
- For enterprise applications needing features like federation, schema stitching, and integration with Apollo Studio.
- For teams who prefer minimal setup and best-practice defaults.

#### Advantages :
- All-in-one solution for GraphQL needs.
- Strong community and ecosystem support.
- Built-in performance monitoring and schema validation tools.
- Integrates well with Apollo Client for end-to-end GraphQL development.

#### Drawbacks :
- Heavier than `graphql-http` in terms of size and complexity.
- Less flexible if you want a completely custom implementation.
- May include features you don't need, which can impact performance.

---

### **Comparison Table**

| Feature               | graphql-http server               | Apollo Server                   |
| --------------------- | --------------------------------- | ------------------------------- |
| **Complexity**        | Lightweight and minimalistic      | Full-featured and opinionated   |
| **Customizability**   | High (you build what you need)    | Moderate (opinionated defaults) |
| **Performance**       | Optimized for minimal overhead    | Slightly heavier                |
| **Streaming Support** | Yes (HTTP streaming supported)    | Limited to WebSockets           |
| **Caching**           | Manual implementation required    | Built-in data source caching    |
| **Subscriptions**     | Basic HTTP support                | Full WebSocket implementation   |
| **Federation**        | Not supported                     | Built-in                        |
| **Use Case**          | Minimalist setups, custom servers | Enterprise-grade applications   |
### **Which One to Choose?**

- **Choose `graphql-http` server** if:
    
    - You want a minimal, spec-compliant GraphQL server.
    - You need high performance and flexibility.
    - You’re comfortable building additional features as needed.
- **Choose Apollo Server** if:
    
    - You need a complete solution with advanced features.
    - You’re working with a team that uses Apollo Client.
    - You want federation, caching, or built-in monitoring.

---

## Testing using Postman 

#### **Schema Introspection**

Use the following query to fetch the GraphQL schema:

```json
{   
	"query": "query { 
		__schema { 
			types { name } 
		} 
	}" 
}
```
#### **Output for a Query**

Request :
```json
{   
	"query": "query { 
		getUser(id: \"1\") { 
			name email age 
		} 
	}"
}
```

Response : 
```json
{
  "data": {
    "getUser": {
      "name": "Alice",
      "email": "alice@example.com",
      "age": 30
    }
  }
}```

#### **Output for a Mutation**

Request :
```json
{
  "query": "mutation { 
		createUser(input: { 
		name: \"Alice\", 
		email: \"alice@example.com\", 
		age: 30 
		}) 
		{ id name } 
	}"
}
```


Response :
```json
{
  "data": {
    "createUser": {
      "id": "1",
      "name": "Alice"
    }
  }
}
```
### **Key Definitions**

- **GraphQL Query**: Fetches data. Similar to `GET` in REST.
- **GraphQL Mutation**: Modifies data. Similar to `POST`, `PUT`, or `DELETE` in REST.
- **Schema**: Defines the data structure, including types and operations.
- **Resolvers**: Functions on the server-side to handle GraphQL operations.
- **Introspection**: Allows clients to query the schema itself to understand the structure and capabilities of the API.
