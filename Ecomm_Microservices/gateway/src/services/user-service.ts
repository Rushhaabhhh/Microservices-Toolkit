import Axios from "axios";

import { axios } from "../library/http";

const client = Axios.create({
    ...axios.defaults,
    baseURL: process.env.USER_SERVICE_URL
});


const UserService = {
    async getAll() {
        return await client.get("/").then((res) => res.data.result);
    },

    async getById(id: string) {
        return await client.get(`/${id}`).then((res) => res.data.result);
    },

    async post({ input }: { input: any }) {
        return await client.post("/", { input }).then((res) => res.data.result);
    }

} as const;

export { UserService };