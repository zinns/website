import { Repo } from './repo';
import { Sender } from './sender';

export interface Base {
  label: string;
  ref: string;
  sha: string;
  user: Sender;
  repo: Repo;
}
