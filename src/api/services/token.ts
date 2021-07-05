import * as fs from 'fs';
import { IToken, IJsonTokens } from '@api/models/token';
import { parseDataToString } from '@api/utils/Utils';

// Handle GET method for listing all users
export function getTokens(): Promise<IJsonTokens> {
  return new Promise((res, rej) =>
    fs.readFile(`./tokens.json`, 'utf8', (err, data) => {
      if (err) {
        rej(err);
        return;
      }

      res(parseDataToString<IJsonTokens>(data));
    })
  );
}

export function setToken(newTokens: IJsonTokens): Promise<void> {
  return new Promise((res, rej) =>
    fs.writeFile('./tokens.json', JSON.stringify(newTokens), 'utf8', (err) => {
      if (err) {
        rej(err);
        return;
      }
    })
  );
}

// Handle POST method
export function addedToken(obj: any): Promise<Partial<IToken>> {
  return new Promise(async (res, rej) => {
    try {
      const { tokens }: IJsonTokens = await getTokens();
      const newToken = {
        token: obj.token.accessToken,
        userId: obj.user.id,
        userEmail: obj.user.email,
        expires: obj.token.expiresIn
      };
      const newJsonTokens = { tokens: tokens.concat(newToken) };
      setToken(newJsonTokens);
      res(newToken);
    } catch (error) {
      rej(error);
    }
  });
}

// Handle GET method to get only one record
export function getToken(tokenInput: string): Promise<IToken | undefined> {
  return new Promise(async (res, rej) => {
    try {
      const { tokens }: IJsonTokens = await getTokens();
      const singleToken = tokens.find((el) => el.token === tokenInput);
      res(singleToken);
    } catch (error) {
      rej(error);
    }
  });
}

// Handle DELETE method
export function deleteToken(tokenInput: string): Promise<IToken[]> {
  return new Promise(async (res, rej) => {
    try {
      const { tokens }: IJsonTokens = await getTokens();
      const newTokens = tokens.filter((el) => el.token !== tokenInput);
      const newJsonTokens = { tokens: newTokens };
      setToken(newJsonTokens);
      res(newTokens);
    } catch (error) {
      rej(error);
    }
  });
}
