import { Reactions } from './reactions';
import { Sender } from './sender';

export interface Comment {
  url: string;
  html_url: string;
  issue_url: string;
  id: number;
  node_id: string;
  user: Sender;
  created_at: string;
  updated_at: string;
  author_association: string;
  body: string;
  reactions: Reactions;
  performed_via_github_app: null;
}
