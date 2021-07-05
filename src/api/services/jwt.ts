import moment from 'moment-timezone';
import jwt from 'jwt-simple';
import * as crypto from 'crypto';
import env from '@env';
import { IUser } from '@api/models/user';

const { JWT_SECRET, JWT_EXPIRATION_MINUTES } = env;

/**
 * Returns a formated object with tokens
 * @param {id} user id
 * @private
 */

export const generateTokenJWT = (id: string) => {
  const playload = {
    exp: moment().add(JWT_EXPIRATION_MINUTES, 'minutes').unix(),
    iat: moment().unix(),
    sub: id
  };
  return jwt.encode(playload, JWT_SECRET as string);
};

/**
 * Generate a refresh token object and saves it into the db.json
 *
 * @param {User} user
 * @returns {RefreshToken}
 */
export function generateToken(user: Partial<IUser>) {
  const userId = user.id;
  const userEmail = user.email;
  const token = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
  const expires = moment().add(1, 'days').toDate();
  const tokenObject = {
    token,
    userId,
    userEmail,
    expires
  };
  return tokenObject;
}

/**
 * Returns a formated object with tokens
 * @private
 */
export function generateTokenResponse(user: Partial<IUser>, accessToken: string) {
  const tokenType = 'Bearer';
  const refreshToken = generateToken(user).token;
  const expiresIn = moment().add(env.JWT_EXPIRATION_MINUTES, 'minutes');
  return {
    tokenType,
    accessToken,
    refreshToken,
    expiresIn
  };
}
