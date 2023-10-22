import { createClient } from "redis";

// ? create redis client ideally this should server should running via docker
const client = createClient({});

const connectRedis = async () => {
  try {
    await client.connect();
    console.log("Redis Server connected.");
  } catch (error) {
    console.error(error.message);
  }
};
const getValueFromRedis = async (key: string) => {
  try {
    const value = await client.get(key);
    return value;
  } catch (error) {
    console.error(error);
  }
};
const setValueToRedis = async (key: string, value: string) => {
  try {
    await client.set(key, value);
  } catch (error) {
    console.error(error);
  }
};
export { connectRedis, getValueFromRedis, setValueToRedis };
