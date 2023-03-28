import { Pusher } from './push';

export interface Commit {
  id: string;
  tree_id: string;
  distinct: boolean;
  message: string;
  timestamp: string;
  url: string;
  author: Pusher;
  committer: Pusher;
  added: any[];
  removed: any[];
  modified: string[];
}
