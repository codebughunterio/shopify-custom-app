
// Import the axios library
import axios from 'axios';

// Define a function named useAxios
export default function useAxios() {
    // Create an instance of axios with base URL and headers
    const instance = axios.create({
        baseURL: 'https://example.com/api/',
        headers: {
            Accept: 'application/json'
        }
    });

    // Return an object with two methods: get and post
    return {
        // Define the get method that sends a GET request using the axios instance
        get: async (url) => await instance.get(url),

        // Define the post method that sends a POST request using the axios instance
        post: async (url, data) => await instance.post(url, data),
    }
}

