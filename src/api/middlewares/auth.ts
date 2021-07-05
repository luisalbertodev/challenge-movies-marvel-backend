import { Response, Request, NextFunction } from 'express';
import jwt from 'jwt-simple';
import { HttpStatusCode } from '@typesProject/http';
import APIError from '@api/utils/APIError';
import { getUsers, getUser } from '@api/services/auth';
import { IJsonUsers } from '@api/models/user';
import env from '@env';

const normalizedString = (s: string): string => s.trim().toLowerCase();

export const decodeToken = (req: Request, res: Response, next: NextFunction) => {
  const token: string | any = req.headers['x-access-token'];

  if (!token) {
    return '';
  }

  try {
    const decoded = jwt.decode(token, env.JWT_SECRET as string);
    return decoded;
  } catch (error) {
    return '';
  }
};

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
  const token: string | any = req.headers['x-access-token'];

  if (!token) {
    const errorTokenNotProvided = new APIError({
      message: 'Token was not provided',
      status: HttpStatusCode.FORBIDDEN
    });
    next(errorTokenNotProvided);
  }

  try {
    const decoded = jwt.decode(token, env.JWT_SECRET as string);
    console.log(decoded);
    // req.userId = decoded.id;

    // const user = await User.findById(req.userId, { password: 0 });
    // if (!user) return res.status(404).send({ message: 'Ningún usuario encontrado' });

    next();
  } catch (error) {
    const errorNotAuthorized = new APIError({
      message: 'Not authorized!',
      status: HttpStatusCode.UNAUTHORIZED
    });
    next(errorNotAuthorized);
  }
};

/**
 * Return new validation error
 * if error is a email duplicate key error
 *
 * @param {Error} error
 * @returns {Error|APIError}
 */
export const checkDuplicateEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { users }: IJsonUsers = await getUsers();
    const isExistUser = users.find((el) => normalizedString(el.email) === normalizedString(req.body.email));
    if (isExistUser) {
      const errorEmailDuplicate = new APIError({
        message: 'This email already exists',
        status: HttpStatusCode.CONFLICT
      });
      next(errorEmailDuplicate);
    }

    next();
  } catch (error) {
    next(error);
  }
};
