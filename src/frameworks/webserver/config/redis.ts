import { Redis } from "ioredis";
import dotenv from "dotenv";
dotenv.config();

//create a redis client
export function redisDb() {
  const redisClient = () => {
    if (process.env.REDIS_URL) {
      console.log("redis has been connected");
      return process.env.REDIS_URL;
    }
    throw new Error("Redis connection failed");
  };
  try {
    const redis = new Redis(redisClient());
    return redis;
  } catch (error) {
    throw error;
  }
}
