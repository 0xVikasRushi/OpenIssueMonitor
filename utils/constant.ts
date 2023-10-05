const REQUEST_RATE = 15;
const API_URL = "https://api.github.com";
const ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const TELEGRAM_ACCESS_TOKEN = process.env.TELEGRAM_ACCESS_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
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
  LABELS,
  REQUEST_RATE,
  TELEGRAM_ACCESS_TOKEN,
  TELEGRAM_CHAT_ID,
};
