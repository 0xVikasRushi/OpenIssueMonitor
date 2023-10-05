require("dotenv").config();
import axios from "axios";
import cron from "node-cron";

async function getRateLimit() {
  const apiUrl = "https://api.github.com/rate_limit";
  const accessToken = process.env.GITHUB_ACCESS_TOKEN;
  const headers = {
    Accept: "application/vnd.github.v3+json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.get(apiUrl, {
      headers,
    });
    const rateLimit = response.data.rate;
    console.log("Rate Limit Remaining:", rateLimit.remaining);
    const resetTime = new Date(rateLimit.reset * 1000);
    console.log(
      "Rate Limit Reset Time:",
      resetTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      })
    );
  } catch (error) {
    console.error("Error fetching rate limit:", error.message);
  }
}

async function getIssues(repoOwner: string, repoName: string) {
  const apiUrl = "https://api.github.com";
  const accessToken = process.env.GITHUB_ACCESS_TOKEN;
  const headers = {
    Accept: "application/vnd.github.v3+json",
    Authorization: `Bearer ${accessToken}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };

  try {
    const res = await axios.get(
      `${apiUrl}/repos/${repoOwner}/${repoName}/issues`,
      {
        headers,
      }
    );
    console.log(res.data[0].url + `(${res.data[0].labels[0].name})`);
  } catch (error) {
    console.error("Error fetching issues:", error.message);
  }
}

cron.schedule("*/15 * * * * *", () => {
  console.count(
    "running a task every 45 seconds------------------------------------>"
  );
  getRateLimit();
  getIssues("facebook", "react");
});
