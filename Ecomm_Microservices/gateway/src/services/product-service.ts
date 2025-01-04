import Axios from 'axios';
import { Context } from "../types";

import { axios } from '../library/http';
import { cacheClient } from '../library/redis';

const client = Axios.create({
    ...axios.defaults,
    baseURL: process.env.PRODUCT_SERVICE_URL
});

const ProductService = {
    async getAll() {
        try {
            const cached = await cacheClient.get("products/");

            if(!cached) throw Error("Cache not found");
            console.log("Products / Cache hit");
            return JSON.parse(cached);

        } catch (error) {
            const data = await client.get("/").then((res) => res.data.result);

            await cacheClient.set("products/", JSON.stringify(data));
            console.log("Products / Cache miss");

            return data;
        }
    },
     
    async getById(id: string) {
        try {
            const cached = await cacheClient.get(`products/${id}`);

            if(!cached) throw Error("Cache not found");
            console.log("Products / Cache hit");
            return JSON.parse(cached);

        } catch (error) {
            const data = await client.get(`/${id}`).then((res) => res.data.result);

            await cacheClient.set(`products/${id}`, JSON.stringify(data));
            console.log("Products / Cache miss");

            return data;
        }
    },

    async post({ input }: { input: any }, context: Context) {
        const apiKey = context.headers["x-api-key"];

        if (apiKey !== process.env.PRODUCT_SERVICE_API_KEY) {
            throw new Error("Invalid API Key");
        }
        return await client.post("/", { input }).then((res) => res.data.result);
    } 
} as const;

export { ProductService };