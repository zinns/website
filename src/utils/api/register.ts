import { Member } from 'config/db/models/ERP';
import Padawan from 'config/db/models/ERP/Padawan';

export const createDBinstance = (type: string, data: { [key: string]: string }) => {
  if (!type) {
    return null;
  }

  switch (type) {
    case 'member':
      return new Member({ ...data });
    case 'padawan':
      return new Padawan({ ...data });
    default:
      return null;
  }
};
