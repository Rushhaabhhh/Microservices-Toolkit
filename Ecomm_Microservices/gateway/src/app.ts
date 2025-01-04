import express from "express";
import { createHandler } from "graphql-http/lib/use/express";

import { schema } from "./schema";
import { UserService } from "./services/user-service";
import { OrderService } from "./services/order-service";
import { ProductService } from "./services/product-service";

const root = {
    users: UserService.getAll,
    user: UserService.getById,
    registerUser: UserService.post,

    products: ProductService.getAll,
    product: ProductService.getById,
    createProduct: ProductService.post,

    orders: OrderService.getAll,
    order: OrderService.getById,
    placeOrder: OrderService.post
};

const app = express();

app.all(
    "/graphql",
    createHandler({
        schema,
        rootValue: root,
        context: (req) => ({ headers: req.headers })
    })
)

export default app;