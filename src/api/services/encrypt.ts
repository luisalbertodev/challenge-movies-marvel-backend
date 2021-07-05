import bcrypt from 'bcryptjs';

export const encryptString = (key: string): Promise<string> => {
  const rounds = 10;
  return new Promise((res, rej) => {
    bcrypt
      .hash(key, rounds)
      .then((hash: string) => res(hash))
      .catch(rej);
  });
};

export function passwordMatches(password: string, entryPassword: string) {
  return new Promise((res, rej) => {
    bcrypt
      .compare(password, entryPassword)
      .then((response) => res(response))
      .catch(rej);
  });
}
