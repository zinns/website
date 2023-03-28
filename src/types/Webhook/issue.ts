import { Assignee } from './assignee';
import { Label } from './label';
import { Milestone } from './milestone';
import { Organization } from './organization';
import { Reactions } from './reactions';
import { Repository } from './repository';

export interface Issue {
  action: string;
  issue: IssueClass;
  assignee: Assignee;
  repository: Repository;
  organization: Organization;
  sender: Assignee;
}

export interface IssueClass {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: Assignee;
  labels: Label[];
  state: string;
  locked: boolean;
  assignee: Assignee;
  assignees: Assignee[];
  milestone: Milestone;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: null;
  author_association: string;
  active_lock_reason: null;
  body: null;
  reactions: Reactions;
  timeline_url: string;
  performed_via_github_app: null;
  state_reason: null;
}
