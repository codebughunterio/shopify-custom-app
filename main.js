// Import the dotenv package and load the environment variables from the .env file
import 'dotenv/config'

// Import the useShopify module from the ./composables/shopify.mjs file
import useShopify from "./composables/shopify.mjs";

// Destructure the functions getProducts, productCount, customerCount, and orderCount from the useShopify module
const {
    getProducts,
    productCount,
    customerCount,
    orderCount
} = useShopify()

// Call the getProducts function asynchronously and store the result in the products variable
const products = await getProducts();

// Display the products in a table format using the console.table() function
console.table(products);

// Display the product count using the productCount function and the console.log() function
console.log(`Product count: ${await productCount()}`);

// Display the customer count using the customerCount function and the console.log() function
console.log(`Customer count: ${await customerCount()}`);

// Display the order count using the orderCount function and the console.log() function
console.log(`Order count: ${await orderCount()}`);
