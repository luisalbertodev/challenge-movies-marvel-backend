import { HttpStatusCode } from '@typesProject/http';
import { getUserByEmail } from '@api/services/auth';
import { ITokenRegenerate } from '@api/models/token';
import { generateTokenJWT } from '@api/services/jwt';
import { passwordMatches } from '@api/services/encrypt';
import { IUser } from '@api/models/user';
import APIError from '@api/utils/APIError';

type TokenType = { token: ITokenRegenerate; user: Partial<IUser> };

export const generateMetadataWelcomeEmail = ({ token, user }: TokenType) => {
  const opt = {
    name: user?.email?.split('@')[0] as string,
    email: user.email as string,
    url: `http://localhost:3009/api/v1/auth/verify?token=${token.accessToken}`
  };
  return opt;
};

export async function findAndGenerateToken({ email, password }: any) {
  if (!email) {
    throw new APIError({ message: 'An email is required to generate a token' });
  }

  const user = await getUserByEmail(email);
  const err: any = {
    status: HttpStatusCode.UNAUTHORIZED,
    isPublic: true
  };

  if (password) {
    if (user && (await passwordMatches(password, user.password))) {
      return {
        user,
        accessToken: generateTokenJWT(user.id as string)
      };
    }
    err.message = 'Incorrect email or password';
  } else {
    err.message = 'Incorrect email or token expired';
  }
  throw new APIError(err);
}
