import Axios from 'axios';

// Create a new axios instance
const axios = Axios.create({});

// Add a request interceptor to log the requested URL and data
axios.interceptors.response.use((response) => { 
    console.log(`URL :  ${response.config?.url}\n ${JSON.stringify(response.data)}`);
    return response;
});

export { axios };