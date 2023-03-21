import bcrypt from 'bcrypt';

export const generateSalt = async () => await bcrypt.genSalt(10);

export const generateHash = async (toHash: string, salt: string) => await bcrypt.hash(toHash, salt);

export const isHashCorrect = async (toHash: string, fromHash: string) =>
  await bcrypt.compare(toHash, fromHash);
