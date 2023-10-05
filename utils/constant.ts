const REQUEST_RATE = 10;
const API_URL = "https://api.github.com";
const ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

const LABELS = new Map([
  ["bug", true],
  ["good first issue", true],
  ["help wanted", true],
  ["area/docs", true],
]);
export { REQUEST_RATE, API_URL, ACCESS_TOKEN, LABELS };
