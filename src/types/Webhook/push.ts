import { Author } from './author';
import { Commit } from './commit';
import { HeadCommit } from './headCommit';
import { Organization } from './organization';
import { Repository } from './repository';
import { Sender } from './sender';

export interface Push {
  ref: string;
  before: string;
  after: string;
  repository: Repository;
  pusher: Author;
  organization: Organization;
  sender: Sender;
  created: boolean;
  deleted: boolean;
  forced: boolean;
  base_ref: string;
  compare: string;
  commits: Commit[];
  head_commit: HeadCommit;
}
