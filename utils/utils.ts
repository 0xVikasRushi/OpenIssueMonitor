export default function convertGithubApiUrlToRegularUrl(
  apiUrl: string
): string | null {
  const apiUrlPattern =
    /^https:\/\/api\.github\.com\/repos\/([^/]+\/[^/]+)\/issues\/(\d+)$/;
  const match = apiUrl.match(apiUrlPattern);
  if (match) {
    const repository = match[1];
    const issueNumber = match[2];
    const regularUrl = `https://github.com/${repository}/issues/${issueNumber}`;
    return regularUrl;
  }
  return null;
}
