import { buildSchema } from 'graphql';

// GraphQL schema using Schema Definition Language (SDL)
const schema = buildSchema(`

    type User {
        _id: ID!
        username: String!
    }

    type Product {
        _id: ID!
        name: String!
        price: Int!
        quantity: Int!
    }

    type OrderProduct {
        _id: ID!
        quantity: Int!
    }

    type Order {
        _id: ID!
        userId: ID!
        products: [OrderProduct]
    }

    input RegisterUserInput {
        username: String!
        password: String!
    }

    input RegisterUserResult {
        access_token: String!
        user: User!
    }
    
    input CreateProductInput {
        name: String!
        price: Int!
        quantity: Int!
    }

    input OrderProductInput {
        _id: String!
        quantity: Int!
    }

    type Query {
        users: [User]
        user(id: ID!): User
        products(id: ID!): Product
        orders: [Order]
        order(id: ID!): Order
    }

    type Mutation {
        registerUser(input: RegisterUserInput): RegisterUserResult
        createProduct(input: CreateProductInput): Product
        placeOrder(products: [OrderProductInput]): Order
    }           
`);

export { schema };


    // RegisterUserResult : Input type for the result of user registration
    // CreateProductResult : Input type for the result of product creation
    // OrderProductInput : Input type for adding products to an order

    // Query type defines the read operations available in the API

    // Mutation type defines the write operations available in the API

        // registerUser : Register a new user, taking a RegisterUserInput and returning RegisterUserResult
        // createProduct : Create a new product, taking input and returning the Product created
        // placeOrder : Place a new order with a list of products, returning the Order created

