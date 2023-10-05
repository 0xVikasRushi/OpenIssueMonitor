interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

interface Label {
  id: number;
  node_id: string;
  url: string;
  name: string;
  description: string;
  color: string;
  default: boolean;
}

interface Milestone {
  url: string;
  html_url: string;
  labels_url: string;
  id: number;
  node_id: string;
  number: number;
  state: string;
  title: string;
  description: string;
  creator: User;
  open_issues: number;
  closed_issues: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  due_on: string;
}

interface PullRequest {
  url: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
}

interface Issue {
  id: number;
  node_id: string;
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  number: number;
  state: string;
  title: string;
  body: string;
  user: User;
  labels: Label[];
  assignee: User;
  assignees: User[];
  milestone: Milestone | null;
  locked: boolean;
  active_lock_reason: string | null;
  comments: number;
  pull_request: PullRequest | null;
  closed_at: string | null;
  created_at: string;
  updated_at: string;
  closed_by: User | null;
  author_association: string;
  state_reason: string;
}

interface FormatIssue {
  url: string;
  label: Label[];
  title: string;
  created_at: string;
  updatedAt: string;
}

interface SortedIssue {
  url: string;
  Requestedlabel: string[];
  title: string;
  created_at: string;
  updatedAt: string;
  originalLabels: string[];
}

export { FormatIssue, Issue, Label, Milestone, PullRequest, SortedIssue, User };
