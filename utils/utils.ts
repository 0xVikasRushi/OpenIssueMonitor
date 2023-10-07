export const convertGithubApiUrlToRegularUrl = (apiUrl: string): string | null => {
  const apiUrlPattern = /^https:\/\/api\.github\.com\/repos\/([^/]+\/[^/]+)\/issues\/(\d+)$/;
  const match = apiUrl.match(apiUrlPattern);
  if (match) {
    const repository = match[1];
    const issueNumber = match[2];
    const regularUrl = `https://github.com/${repository}/issues/${issueNumber}`;
    return regularUrl;
  }
  return null;
};
export const getRepoOwnerAndName = (repoUrl: string): [string, string] => {
  const url = new URL(repoUrl);
  if (url.hostname !== "github.com") {
    throw new Error("Not a GitHub repository URL");
  }

  const pathParts = url.pathname.split("/");

  const repoOwner = pathParts[1];
  const repoName = pathParts[2];

  return [repoOwner, repoName];
};
