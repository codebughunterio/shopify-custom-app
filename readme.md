# Shopify Custom App Boilerplate

This is a boilerplate for creating custom Shopify apps for individual stores. It is built on composable architecture and includes composition APIs for logging, Shopify, and Axios.


## Installation

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Run `cp .env.example .env` to create a new `.env` file.
4. Update the `.env` file with your credentials.
5. Run `node main.js` to start the app.

## Features

- Built on composable architecture.
- Composition API for logging, Shopify, and Axios.
- Default logging system.
- Examples for both GraphQL and REST API requests.

## File Structure

```bash
├───composables # All composition APIs will be here 
└───logs        # Logs will be here
.env.example    # example env file with credentials
main.js         # Main entry point for the app
package.json    # Package information and dependencies
readme.md
```