import { Author } from './author';

export interface Commit {
  id: string;
  tree_id: string;
  distinct: boolean;
  message: string;
  timestamp: string;
  url: string;
  author: Author;
  committer: Author;
  added: unknown[];
  removed: unknown[];
  modified: string[];
}
