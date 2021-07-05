import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '@typesProject/http';
import { sendEmail, welcomeEmail } from '@api/utils/MsgUtils';
import env from '@env';
import { addedUser, updatedUser } from '@api/services/auth';
import { deleteToken, addedToken, getToken } from '@api/services/token';
import { generateTokenJWT, generateTokenResponse } from '@api/services/jwt';
import { IUser } from '@api/models/user';
import APIError from '@api/utils/APIError';
import { generateMetadataWelcomeEmail, findAndGenerateToken } from '@api/utils/Auth';

/**
 * Returns jwt token if registration was successful
 * @public
 */
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: Partial<IUser> = await addedUser(req.body);
    const token = generateTokenResponse(user, generateTokenJWT(user.id as string));
    res.status(HttpStatusCode.CREATED);
    const data = { token, user };
    await addedToken(data);

    if (env.emailEnabled) {
      // for testing: it can only email to "authorized recipients" in Mailgun Account Settings.
      sendEmail(welcomeEmail(generateMetadataWelcomeEmail(data)));
    }
    return res.json(data);
  } catch (error) {
    return next(error);
  }
};

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, accessToken } = await findAndGenerateToken(req.body);
    const token = generateTokenResponse(user, accessToken);
    const data = { token, user };
    return res.json(data);
  } catch (error) {
    return next(error);
  }
};

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
export const verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.query.token as string;
    if (!token) {
      const errorNotFoundToken = new APIError({
        message: 'Not found token',
        status: HttpStatusCode.NOT_FOUND
      });

      next(errorNotFoundToken);
      return;
    }

    const propsToken = await getToken(token);

    if (!propsToken) {
      const errorNotFoundToken = new APIError({
        message: 'Not exist token',
        status: HttpStatusCode.NOT_FOUND
      });

      next(errorNotFoundToken);
      return;
    }

    res.status(HttpStatusCode.OK);
    await deleteToken(token);
    const user = await updatedUser(propsToken.userId, { isVerified: true });
    return res.json(user);
  } catch (error) {
    return next(error);
  }
};
