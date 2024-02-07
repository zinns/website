import { Reactions } from './reactions';
import { Sender } from './sender';

export interface CommentClass {
  _links: CommentLinks;
  author_association: string;
  body: string;
  commit_id: string;
  created_at: string;
  diff_hunk: string;
  html_url: string;
  id: number;
  line: number;
  node_id: string;
  original_commit_id: string;
  original_line: number;
  original_position: number;
  original_start_line: null;
  path: string;
  position: number;
  pull_request_review_id: number;
  pull_request_url: string;
  reactions: Reactions;
  side: string;
  start_line: null;
  start_side: null;
  subject_type: string;
  updated_at: string;
  url: string;
  user: Sender;
}

export interface CommentLinks {
  self: HTML;
  html: HTML;
  pull_request: HTML;
}

export interface HTML {
  href: string;
}
