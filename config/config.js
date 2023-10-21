require("dotenv").config();

const config = {
  development: {
    corsOptions: {
      origin: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://windfootball-nextjs-frondend.vercel.app",
      ],
      credentials: true,
    },
    databaseURI: process.env.DEV_DATABASE_URL,
    apiKey: process.env.API_KEY,
    appSecret: process.env.APP_SECRET,
  },
  production: {
    corsOptions: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
    databaseURI: process.env.PROD_DATABASE_URL,
    apiKey: process.env.API_KEY,
    appSecret: process.env.APP_SECRET,
  },
};

module.exports = config;
