import '@shopify/shopify-api/adapters/node'
import { LATEST_API_VERSION, shopifyApi } from "@shopify/shopify-api";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-04";
import useLog from "./log.mjs";

const {
  DOMAIN,
  TOKEN,
  SECRET
} = process.env;

const {
  write
} = useLog();


const shopify = shopifyApi({
  apiSecretKey: SECRET,            // Note: this is the API Secret Key, NOT the API access token
  apiVersion: LATEST_API_VERSION,
  isCustomStoreApp: true,                        // this MUST be set to true (default is false)
  adminApiAccessToken: TOKEN, // Note: this is the API access token, NOT the API Secret Key
  isEmbeddedApp: false,
  hostName: DOMAIN,
  restResources
});
const session = shopify.session.customAppSession(DOMAIN);

export default function useShopify() {
  // Function to get products using GraphQL
  const getProducts = async () => {
    // Create a GraphQL client
    const client = new shopify.clients.Graphql({ session });
    // GraphQL query string to fetch products
    const queryString = `
      query {
        products(first: 5) {
          nodes {
            id
            title
            variants(first: 1) {
              nodes {
                sku
              }
            }
          }
        }
      }
    `;

    // Make the GraphQL query request
    const response = await client.query({ data: queryString });

    // Extract the necessary product information from the response
    const products = response.body.data.products.nodes.map((n) => ({
      productId: n.id,
      variantIds: n.variants.nodes[0].sku,
    }));

    // Write the products to a log
    write(products);

    // Return the products
    return products;
  };

  // Function to get the count of products using REST
  const productCount = async () => {
    // Make a REST API call to get the product count
    const { count: productCount } = await shopify.rest.Product.count({ session });

    // Write the product count to a log
    write(`Product count: ${productCount}`);

    // Return the product count
    return productCount;
  };

  // Function to get the count of customers using REST
  const customerCount = async () => {
    // Make a REST API call to get the customer count
    const { count: customerCount } = await shopify.rest.Customer.count({ session });

    // Write the customer count to a log
    write(`Customer count: ${customerCount}`);

    // Return the customer count
    return customerCount;
  };

  // Function to get the count of orders using REST
  const orderCount = async () => {
    // Make a REST API call to get the order count
    const { count: orderCount } = await shopify.rest.Order.count({ session });

    // Write the order count to a log
    write(`Order count: ${orderCount}`);

    // Return the order count
    return orderCount;
  };

  // Return the functions as an object
  return {
    productCount,
    customerCount,
    orderCount,
    getProducts,
  };
}
