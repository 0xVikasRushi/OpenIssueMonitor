import { ServerStatus } from "../types/server";
const REQUEST_RATE = 15;
const API_URL = "https://api.github.com";
const ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const TELEGRAM_ACCESS_TOKEN = process.env.TELEGRAM_ACCESS_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// ? GLOBAL STATE

// TODO: SHOULD SAVE IN REDIS AND MAINATAIN THE STATE
let REPO_NAME = process.env.REPO_NAME;
let REPO_OWNER = process.env.REPO_OWNER;
let SERVER_STATUS: ServerStatus = "Ideal";
let CONFIGURATION: string = "";

const setterConfiguration = (message: string) => {
  CONFIGURATION = message;
};
const setterServerStatus = (status: ServerStatus) => {
  SERVER_STATUS = status;
};

const setterRepoInfo = (_repoOwner: string, _repoName: string) => {
  REPO_OWNER = _repoOwner;
  REPO_NAME = _repoName;
};

const LABELS = new Map([
  ["bug", true],
  ["good first issue", false],
  ["help wanted", false],
  ["area/docs", false],
  ["Hacktoberfest", false],
  ["documentation", true],
  ["dashboard", true],
  ["Low priority", true],
  ["🐛 bug", true],
]);

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
  setterConfiguration,
  setterRepoInfo,
  setterServerStatus,
};
