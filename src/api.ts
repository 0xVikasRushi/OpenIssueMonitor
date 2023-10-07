import axios from "axios";
import { ACCESS_TOKEN, API_URL } from "../utils/constant";
import { FormatIssue, Issue } from "../types/issues";

const headers = {
  Accept: "application/vnd.github.v3+json",
  Authorization: `Bearer ${ACCESS_TOKEN}`,
  "X-GitHub-Api-Version": "2022-11-28",
};

const githubAPI = axios.create({
  baseURL: API_URL,
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
    const response = await githubAPI.get(`/repos/${repoOwner}/${repoName}/issues`);
    const issues: Issue[] = response.data;

    const formatIssues: FormatIssue[] = issues.map((issue: Issue) => ({
      url: issue.url,
      label: issue.labels,
      title: issue.title,
      created_at: issue.created_at,
      updatedAt: issue.updated_at,
    }));

    return formatIssues;
  } catch (error) {
    throw new Error("Error fetching issues: " + error.message);
  }
}
