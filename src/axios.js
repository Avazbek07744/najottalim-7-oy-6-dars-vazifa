import axios from "axios";

export const lord = axios.create({ 
    baseURL: 'https://strapi-store-server.onrender.com/api/' 
})