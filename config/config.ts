import dotenv from "dotenv";
//Environment Variables
dotenv.config({ path: "./config/env/config.env" });

export const environment = process.env.NODE_ENV || "development";
export const port = process.env.PORT || "5000";

export const db = {
    name: process.env.DB_NAME || 'trendyol_case',
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_USER_PWD || 'admin',
  };

export const redisCache = {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || "6379",
    cache_time :process.env.REDIS_CACHE_TIMEOUT || "3600"

  };
