import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '@typesProject/http';
import APIError from '@api/utils/APIError';
import * as auth from '@api/services/auth';
import { IUser, IJsonUsers } from '@api/models/user';

/**
 * Returns array of object type users
 * @public
 */
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { users }: IJsonUsers = await auth.getUsers();
    res.status(HttpStatusCode.OK);

    return res.json(users);
  } catch (error) {
    return next(error);
  }
};

/**
 * Returns single user by id
 *
 * @param {string} id
 * @public
 */
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IUser | undefined = await auth.getUser(req.params.id);

    if (!user) {
      const errorNotFoundUser = new APIError({
        message: 'Not exist user',
        status: HttpStatusCode.NOT_FOUND
      });

      next(errorNotFoundUser);
      return;
    }

    res.status(HttpStatusCode.OK);
    return res.json(user);
  } catch (error) {
    return next(error);
  }
};
