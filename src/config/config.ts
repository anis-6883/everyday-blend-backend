import { Config } from "types";

const config: Config = {
  development: {
    corsOptions: {
      origin: process.env.CORS_ORIGINS.split(","),
      credentials: true,
    },
    databaseURI: process.env.DEV_DATABASE_URL, // Use DEV_DATABASE_URL from .env
    port: process.env.PORT || 8000, // Use PORT from .env or default to 8080
    apiKey: process.env.API_KEY, // Use API_KEY from .env
    appSecret: process.env.APP_SECRET, // Use APP_SECRET from .env
  },
  production: {
    corsOptions: {
      origin: process.env.CORS_ORIGINS.split(","),
      credentials: true,
    },
    databaseURI: process.env.PROD_DATABASE_URL, // Use PROD_DATABASE_URL from .env
    port: process.env.PORT || 8000, // Use PORT from .env or default to 8080
    apiKey: process.env.API_KEY, // Use API_KEY from .env
    appSecret: process.env.APP_SECRET, // Use APP_SECRET from .env
  },
};

export default config;
