import { Config } from "types";

const config: Config = {
  development: {
    corsOptions: {
      origin: process.env.CORS_ORIGINS.split(","),
      credentials: true,
    },
    databaseURI: process.env.DEV_DATABASE_URL,
    port: process.env.PORT || 8000,
    apiKey: process.env.API_KEY,
    appSecret: process.env.APP_SECRET,
  },
  production: {
    corsOptions: {
      origin: process.env.CORS_ORIGINS.split(","),
      credentials: true,
    },
    databaseURI: process.env.PROD_DATABASE_URL,
    port: process.env.PORT || 8000,
    apiKey: process.env.API_KEY,
    appSecret: process.env.APP_SECRET,
  },
};

export default config;
