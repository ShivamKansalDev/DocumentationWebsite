import dotenv from "dotenv";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? "../.env.production"
      : "../.env.development",
});

const config = {
  env: process.env.NODE_ENV || "development",
  db: {
    mongo_url: process.env.MONGO_URL,
  },
  port: process.env.PORT,
  authKey: process.env.USER_AUTH_KEY,
};

export default config;
