import { Organization } from './organization';
import { PullRequestClass } from './pull_request';
import { Reactions } from './reactions';
import { Repository } from './repository';
import { Sender } from './sender';

export interface Comment {
  action: string;
  comment: CommentClass;
  pull_request: PullRequestClass;
  repository: Repository;
  organization: Organization;
  sender: Sender;
}

export interface CommentClass {
  url: string;
  pull_request_review_id: number;
  id: number;
  node_id: string;
  diff_hunk: string;
  path: string;
  commit_id: string;
  original_commit_id: string;
  user: Sender;
  body: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  pull_request_url: string;
  author_association: string;
  _links: CommentLinks;
  reactions: Reactions;
  start_line: null;
  original_start_line: null;
  start_side: null;
  line: number;
  original_line: number;
  side: string;
  original_position: number;
  position: number;
  subject_type: string;
}

export interface CommentLinks {
  self: HTML;
  html: HTML;
  pull_request: HTML;
}

export interface HTML {
  href: string;
}
