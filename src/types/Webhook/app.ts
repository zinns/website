import { Permission } from './permission';
import { Sender } from './sender';

export interface App {
  id: number;
  slug: string;
  node_id: string;
  owner: Sender;
  name: string;
  description: string;
  external_url: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  permissions: { [key: string]: Permission };
  events: string[];
}
