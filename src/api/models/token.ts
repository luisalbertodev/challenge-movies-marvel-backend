export interface ITokenRegenerate {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: Date | string | any;
}

export interface IToken {
  token: String;
  userId: string;
  userEmail: string;
  expires: Date | any;
}

export interface IJsonTokens {
  tokens: IToken[];
}
