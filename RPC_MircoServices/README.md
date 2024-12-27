# Microservices with RPC using RabbitMQ

This project demonstrates a simple implementation of microservices architecture using RPC (Remote Procedure Call) over RabbitMQ for communication between services. It includes two services:

- **Product Service**: Handles product-related operations.
- **Customer Service**: Handles customer-related operations and communicates with the Product Service.

## Overview

In this architecture, the services communicate asynchronously via RabbitMQ, where one service sends a request and waits for a response from another service. The RabbitMQ queue serves as the medium for message exchange.

- **Product Service** listens on the `PRODUCT_RPC` queue and processes product-related requests.
- **Customer Service** listens on the `CUSTOMER_RPC` queue and communicates with the Product Service for product data.

## Technologies Used

- **Node.js**: The runtime environment for both services.
- **Express.js**: Web framework for handling HTTP requests.
- **RabbitMQ**: Message broker for asynchronous communication.
- **UUID**: Used to generate unique correlation IDs for request-response matching.
- **AMQPLib**: Library to interact with RabbitMQ.

## How It Works

1. **Product Service** exposes an RPC API (`PRODUCT_RPC`) to provide product details.
2. **Customer Service** sends a request to `PRODUCT_RPC` to retrieve product details by making a request with customer-specific data (e.g., wishlist).
3. Both services use a common RabbitMQ connection and interact by sending and receiving messages in the respective queues.

## Components

- **RPCObserver**: This function listens on a specified queue (`PRODUCT_RPC` or `CUSTOMER_RPC`) and processes incoming messages.
- **RPCRequest**: This function sends a request to a specified queue and waits for the response using a `correlationId` to match the request and response.


## Setup Instructions

### Install Dependencies:

Clone this repository to your local machine and run the following command to install the required dependencies:

```bash
npm install
```

### Start RabbitMQ:

Make sure you have RabbitMQ installed and running on localhost or configure the connection URL in rpc.js accordingly.

### Start the Services 

```bash
npm start
```

Both services will listen on different ports :
- Product Service: http://localhost:8000
- Customer Service: http://localhost:9000

## Testing the API:

After starting both services, you can test the APIs:

- **Product Service**: Open your browser or use a tool like Postman and make a GET request to `http://localhost:8000/customer` to get customer data.
- **Customer Service**: Make a GET request to `http://localhost:9000/wishlist` to get the wishlist information, which will internally call the Product Service.

The services will communicate asynchronously using RabbitMQ, and you will see the interactions in the console logs.

## Key Features

- **Asynchronous Communication**: Uses RabbitMQ for message queuing and asynchronous communication between services.
- **UUID for Request-Response Matching**: Uses `correlationId` to match responses to specific requests.
- **Fake DB Operations**: Simulates database operations using `setTimeout` to introduce delay in processing requests.

## Example of RPC Flow

1. The **Customer Service** sends a request to the `PRODUCT_RPC` queue with customer and product data.
2. The **Product Service** receives the request from the queue, processes it, and sends a response back to the **Customer Service** using the `correlationId`.
3. The **Customer Service** receives the response and sends it back to the client.

## Code Explanation

### rpc.js

This file contains the core logic for interacting with RabbitMQ. It exposes functions for sending and receiving messages asynchronously using the RPC pattern.

- **getChannel**: Establishes a connection with RabbitMQ and returns a channel.
- **RPCObserver**: Listens to a specific queue (`RPC_QUEUE_NAME`) and processes incoming messages.
- **RPCRequest**: Sends a request to a queue and waits for the response, using a `correlationId` for matching requests with responses.

### productService.js and customerService.js

These files contain Express API routes that simulate product and customer data retrieval. The `RPCObserver` listens to a queue, while the `RPCRequest` sends data requests to other services.
