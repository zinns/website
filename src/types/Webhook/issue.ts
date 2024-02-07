import { Assignee } from './assignee';
import { LabelClass } from './label';
import { MilestoneClass } from './milestone';
import { Reactions } from './reactions';

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
  labels: LabelClass[];
  state: string;
  locked: boolean;
  assignee: Assignee;
  assignees: Assignee[];
  milestone: MilestoneClass;
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
