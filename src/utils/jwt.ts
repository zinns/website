import jwt from 'jsonwebtoken';
import { JWTUserType } from 'types/jwt';

const SECRET_KEY = process.env.JWT_KEY ?? '';

export const createToken = (user: JWTUserType, word: string, expiresIn: string) =>
  jwt.sign({ ...user }, word, { expiresIn });

/*
 * @params {jwtToken} extracted from cookies
 * @return {object} object of extracted token
 */

export function verifyToken(jwtToken: string) {
  try {
    return jwt.verify(jwtToken, SECRET_KEY);
  } catch (e) {
    console.log('error:', e);
    return null;
  }
}
