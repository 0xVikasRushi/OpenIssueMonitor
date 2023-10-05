const REQUEST_RATE = 15;
const API_URL = "https://api.github.com";
const ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

const LABELS = new Map([
  ["bug", true],
  ["good first issue", true],
  ["help wanted", false],
  ["area/docs", false],
  ["Hacktoberfest", true],
]);
export { REQUEST_RATE, API_URL, ACCESS_TOKEN, LABELS };
