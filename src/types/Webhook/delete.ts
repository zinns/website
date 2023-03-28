import { Organization } from './organization';
import { Repository } from './repository';
import { Sender } from './sender';

export interface Delete {
  ref: string;
  ref_type: string;
  pusher_type: string;
  repository: Repository;
  organization: Organization;
  sender: Sender;
}
