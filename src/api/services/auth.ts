import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { IUser, IJsonUsers } from '@api/models/user';
import { parseDataToString, normalizedString } from '@api/utils/Utils';
import { encryptString } from '@api/services/encrypt';

// Handle GET method for listing all users
export function getUsers(): Promise<IJsonUsers> {
  return new Promise((res, rej) =>
    fs.readFile(`./users.json`, 'utf8', (err, data) => {
      if (err) {
        rej(err);
        return;
      }

      res(parseDataToString<IJsonUsers>(data));
    })
  );
}

export function setUser(newUsers: IJsonUsers): Promise<void> {
  // First read existing users.
  return new Promise((res, rej) =>
    fs.writeFile('./users.json', JSON.stringify(newUsers), 'utf8', (err) => {
      if (err) {
        rej(err);
        return;
      }
    })
  );
}

// Handle POST method
export function addedUser({ email, password }: IUser): Promise<Partial<IUser>> {
  // First read existing users.
  return new Promise(async (res, rej) => {
    try {
      const { users }: IJsonUsers = await getUsers();
      const newUser = {
        email: normalizedString(email),
        createdAt: new Date().getTime(),
        id: uuidv4(),
        isVerified: false
      };
      const newJsonUsers = { users: users.concat({ ...newUser, password: await encryptString(password) }) };
      setUser(newJsonUsers);
      res(newUser);
    } catch (error) {
      rej(error);
    }
  });
}

// Handle PUT method
export function updatedUser(idUser: string, user: Partial<IUser> | any): Promise<Partial<IUser> | undefined> {
  // First read existing users.
  return new Promise(async (res, rej) => {
    try {
      const { users }: IJsonUsers = await getUsers();
      const currentUser = users.find((el) => el.id === idUser);
      const newUser = {
        ...currentUser,
        ...user
      };
      const newJsonUsers = {
        users: users.filter((el) => el.id !== idUser).concat({ ...newUser, password: currentUser?.password })
      };
      setUser(newJsonUsers);
      res(newUser);
    } catch (error) {
      rej(error);
    }
  });
}

// Handle GET method to get only one record
export function getUser(idUser: string): Promise<IUser | undefined> {
  return new Promise(async (res, rej) => {
    try {
      const { users }: IJsonUsers = await getUsers();
      const singleUser = users.find((el) => el.id === idUser);
      res(singleUser);
    } catch (error) {
      rej(error);
    }
  });
}

// Handle GET method to get only one record
export function getUserByEmail(email: string): Promise<IUser | undefined> {
  return new Promise(async (res, rej) => {
    try {
      const { users }: IJsonUsers = await getUsers();
      const singleUser = users.find((el) => el.email === email);
      res(singleUser);
    } catch (error) {
      rej(error);
    }
  });
}

// Handle DELETE method
export function deleteUser(idUser: string): Promise<IUser[]> {
  return new Promise(async (res, rej) => {
    try {
      const { users }: IJsonUsers = await getUsers();
      const newUsers = users.filter((el) => el.id !== idUser);
      const newJsonUsers = { users: newUsers };
      setUser(newJsonUsers);
      res(newUsers);
    } catch (error) {
      rej(error);
    }
  });
}
