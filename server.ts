import express from "express";
import { Application } from "express";
import ServerIndex from "./controller/ServerIndex";
import { unCoughtErrorHandler } from "./middlewares/error/errorHandler";
import RedisManager from "./data/caching/RedisManager";
import RedisMiddleware from "./middlewares/redis/RedisMiddleware";
import {port,environment} from "./config/config"
import PathMiddleWare from "./middlewares/path/PathMiddleware";

// Creating our server
const app: Application = express();
const PORT: number = parseInt(port)

//error-handler middleware
app.use(unCoughtErrorHandler);

// Init Redis Caching
export const redis = new RedisManager();

// // Redis cache middleware
export const redisCacheMiddleware = new RedisMiddleware(redis.client);


const server: ServerIndex = new ServerIndex(app);

export default app.listen(PORT, () => {
  console.log(
    `server is running http://localhost:${PORT} : ${environment}`
  );
});
