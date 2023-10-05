import axios from "axios";

const apiUrl = "https://api.github.com";
const accessToken = process.env.GITHUB_ACCESS_TOKEN;

const headers = {
  Accept: "application/vnd.github.v3+json",
  Authorization: `Bearer ${accessToken}`,
  "X-GitHub-Api-Version": "2022-11-28",
};

const githubAPI = axios.create({
  baseURL: apiUrl,
  headers: headers,
});

export async function getRateLimit() {
  try {
    const response = await githubAPI.get("/rate_limit");
    const rateLimit = response.data.rate;
    return {
      remaining: rateLimit.remaining,
      resetTime: new Date(rateLimit.reset * 1000).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }),
    };
  } catch (error) {
    throw new Error("Error fetching rate limit: " + error.message);
  }
}

export async function getIssues(repoOwner: string, repoName: string) {
  try {
    const response = await githubAPI.get(
      `/repos/${repoOwner}/${repoName}/issues`
    );
    const issues = response.data;
    return issues.map((issue: any) => ({
      url: issue.url,
      label: issue.labels[0] ? issue.labels[0].name : "",
    }));
  } catch (error) {
    throw new Error("Error fetching issues: " + error.message);
  }
}
