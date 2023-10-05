require("dotenv").config();
import { Octokit } from "@octokit/core";
const cron = require("node-cron");
const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

async function getIssues(repoOwner: string, repoName: string) {
  try {
    const req = await octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner: repoOwner,
      repo: repoName,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    console.log(req.data[0].url);
  } catch (error) {
    console.error(error.message);
  }
}

// cron.schedule("*/45 * * * * *", () => {
//   console.count(
//     "running a task every 45 seconds------------------------------------>"
//   );
//   getIssues("facebook", "react");
// });

setInterval(() => {
  console.count(
    "running a task every 45 seconds------------------------------------>"
  );
  getIssues("facebook", "react");
}, 45000);
