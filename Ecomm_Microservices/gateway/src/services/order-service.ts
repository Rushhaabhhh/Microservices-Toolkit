import Axios from 'axios';
import { Context } from "../types";
import { verify } from 'jsonwebtoken';

import { axios } from '../library/http';


const client = Axios.create({
    ...axios.defaults,
    baseURL: process.env.ORDER_SERVICE_URL
});

const OrderService = {
    async getAll() {
        return await client.get("/").then((res) => res.data.result);
    },

    async getById(id: string) {
        return await client.get(`/${id}`).then((res) => res.data.result);
    },

    async post({products}: {products: any}, context: Context) {
        const auth = context.headers["authorization"];
        let userId = '';

        try {
            const token = auth.split("Bearer ")[1];
            
            if(!token) throw new Error("Token is not provided");
            if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");

            const payload = verify(token, process.env.JWT_SECRET) as unknown as {
                userId: string;
            } 

            userId = payload.userId;
        } catch (error) {
            throw new Error("Unauthorized");
        }

        return await client
            .post("/", {products}, {headers: {"x-user-id": userId} })
            .then((res) => res.data.result);
    }
} as const;

export { OrderService };