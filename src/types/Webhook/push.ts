import { Commit } from './commit';
import { Organization } from './organization';
import { Repository } from './repository';
import { Sender } from './sender';

export interface Push {
  ref: string;
  before: string;
  after: string;
  repository: Repository;
  pusher: Pusher;
  organization: Organization;
  sender: Sender;
  created: boolean;
  deleted: boolean;
  forced: boolean;
  base_ref: null;
  compare: string;
  commits: Commit[];
  head_commit: Commit;
}

export interface Pusher {
  name: string;
  email: string;
}
