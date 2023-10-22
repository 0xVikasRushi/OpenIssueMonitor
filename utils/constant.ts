import { getConfiguration, setConfiguration, config } from "../src/store/config";
import { ServerConfig, ServerStatus } from "../types/server";

let currentConfig: ServerConfig = config;

const initStore = async () => {
  currentConfig = await getConfiguration();
};
initStore();
console.log(currentConfig);

// ? GLOBAL CONSTANTS
const REQUEST_RATE = currentConfig.REQUEST_RATE;
const API_URL = "https://api.github.com";
const CONFIGURATION = currentConfig.CONFIGURATION;
const TELEGRAM_CHAT_ID = currentConfig.TELEGRAM_CHAT_ID;

const ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const TELEGRAM_ACCESS_TOKEN = process.env.TELEGRAM_ACCESS_TOKEN;

// TODO: SHOULD SAVE IN REDIS AND MAINATAIN THE STATE
const REPO_NAME = currentConfig.REPO_NAME ? currentConfig.REPO_NAME : "";
const REPO_OWNER = currentConfig.REPO_OWNER ? currentConfig.REPO_OWNER : "";
const SERVER_STATUS: ServerStatus = currentConfig.SERVER_STATUS;
const LABELS = currentConfig.LABELS;

const setterConfiguration = async (message: string) => {
  setConfiguration("CONFIGURATION", message);
};

const setterServerStatus = async (status: ServerStatus) => {
  setConfiguration("SERVER_STATUS", status);
};

const setterChatId = async (chatId: number) => {
  await setConfiguration("TELEGRAM_CHAT_ID", chatId);
};

const setterRequestRate = async (rate: number) => {
  await setConfiguration("REQUEST_RATE", rate);
};
const setterRepoInfo = async (_repoOwner: string, _repoName: string) => {
  await setConfiguration("REPO_NAME", _repoName);
  await setConfiguration("REPO_OWNER", _repoOwner);
};

export {
  ACCESS_TOKEN,
  API_URL,
  CONFIGURATION,
  LABELS,
  REPO_NAME,
  REPO_OWNER,
  REQUEST_RATE,
  SERVER_STATUS,
  TELEGRAM_ACCESS_TOKEN,
  TELEGRAM_CHAT_ID,
  initStore,
  setterChatId,
  setterConfiguration,
  setterRepoInfo,
  setterRequestRate,
  setterServerStatus,
};
