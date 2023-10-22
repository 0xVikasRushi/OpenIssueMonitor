import { ServerConfig, ServerStatus } from "./../../types/server";
import { getValueFromRedis, setValueToRedis } from "./redis-server";

const config: ServerConfig = {
  API_URL: "https://api.github.com",
  ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN || "",
  TELEGRAM_ACCESS_TOKEN: process.env.TELEGRAM_ACCESS_TOKEN || "",
  TELEGRAM_CHAT_ID: parseInt(process.env.TELEGRAM_CHAT_ID) || 0,
  REPO_NAME: process.env.REPO_NAME || "",
  REPO_OWNER: process.env.REPO_OWNER || "",
  LABELS: new Map([
    ["bug", true],
    ["good first issue", false],
    ["help wanted", false],
    ["area/docs", false],
    ["Hacktoberfest", false],
    ["documentation", true],
    ["dashboard", true],
    ["Low priority", true],
    ["🐛 bug", true],
  ]),
  SERVER_STATUS: "Ideal" as ServerStatus,
  CONFIGURATION: "",
  REQUEST_RATE: 10,
};

const setConfiguration = async <K extends keyof ServerConfig>(key: K, value: ServerConfig[K]) => {
  config[key] = value;
  setValueToRedis("CONFIG", config.toString());
};

const getConfiguration = async (): Promise<ServerConfig> => {
  const serializedConfig = await getValueFromRedis("CONFIG");
  if (serializedConfig) {
    return JSON.parse(serializedConfig) as ServerConfig;
  }
  return config;
};

export { config, setConfiguration, getConfiguration };
