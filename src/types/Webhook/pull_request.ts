import { Base } from './base';
import { Links } from './links';
import { MilestoneClass } from './milestone';
import { Organization } from './organization';
import { Repository } from './repository';
import { Sender } from './sender';

export interface PullRequest {
  action: string;
  changes: { [key: string]: string };
  number: number;
  organization: Organization;
  pull_request: PullRequestClass;
  repository: Repository;
  requested_reviewer: {
    [key: string]: string;
  };
  sender: Sender;
}

export interface PullRequestClass {
  _links: Links;
  active_lock_reason: null;
  additions: number;
  assignee: Sender;
  assignees: any[];
  author_association: string;
  auto_merge: null;
  base: Base;
  body: string;
  changed_files: number;
  closed_at: string;
  comments_url: string;
  comments: number;
  commits_url: string;
  commits: number;
  created_at: string;
  deletions: number;
  diff_url: string;
  draft: boolean;
  head: Base;
  html_url: string;
  id: number;
  issue_url: string;
  labels: any[];
  locked: boolean;
  maintainer_can_modify: boolean;
  merge_commit_sha: string;
  mergeable_state: string;
  mergeable: null;
  merged_at: string;
  merged_by: Sender;
  merged: boolean;
  milestone: MilestoneClass;
  node_id: string;
  number: number;
  patch_url: string;
  rebaseable: null;
  requested_reviewers: any[];
  requested_teams: any[];
  review_comment_url: string;
  review_comments_url: string;
  review_comments: number;
  state: string;
  statuses_url: string;
  title: string;
  updated_at: string;
  url: string;
  user: Sender;
}
