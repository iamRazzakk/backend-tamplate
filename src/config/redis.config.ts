import Redis from "ioredis";
import { logger, errorLogger } from "../shared/logger";
import colors from "colors";

const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = process.env.REDIS_PORT || 6379;

const redisClient = new Redis({
  host: redisHost,
  port: Number(redisPort),
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

// Listen to Redis events
redisClient.on("connect", () => {
  logger.info(colors.green("✔ Redis connecting..."));
});

redisClient.on("ready", () => {
  logger.info(colors.green("✔ Redis connected successfully and ready"));
});

redisClient.on("error", (error) => {
  errorLogger.error(colors.red("❌ Redis connection error:"), error);
});

redisClient.on("close", () => {
  logger.info(colors.yellow("⚠ Redis connection closed"));
});

redisClient.on("reconnecting", () => {
  logger.info(colors.yellow("🔄 Redis reconnecting..."));
});

class RedisWrapper {
  async connect() {
    try {
      // ioredis connects automatically, just ping to verify
      await redisClient.ping();
      return true;
    } catch (error: any) {
      errorLogger.error(
        colors.red("❌ Redis connection failed:"),
        error.message
      );
      return false;
    }
  }

  async disconnect() {
    await redisClient.quit();
    logger.info("Redis disconnected gracefully");
  }
}

export const RedisClient = new RedisWrapper();
export default redisClient;
