"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisDb = void 0;
const ioredis_1 = require("ioredis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//create a redis client
function redisDb() {
    const redisClient = () => {
        if (process.env.REDIS_URL) {
            console.log("redis has been connected");
            return process.env.REDIS_URL;
        }
        throw new Error("Redis connection failed");
    };
    try {
        const redis = new ioredis_1.Redis(redisClient());
        return redis;
    }
    catch (error) {
        throw error;
    }
}
exports.redisDb = redisDb;
//# sourceMappingURL=redis.js.map