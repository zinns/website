import { User } from 'config/db/models';

export const userExists = async (
  usingIdentifier: boolean,
  credentials: { identifier?: string; username?: string; phone?: string },
) => {
  return await User.findOne(
    usingIdentifier
      ? { $or: [{ phone: credentials.identifier }, { username: credentials.identifier }] }
      : { $or: [{ phone: credentials.phone, username: credentials.username }] },
  );
};
