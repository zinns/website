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
  added: any[];
  removed: any[];
  modified: string[];
}
