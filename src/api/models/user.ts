export interface IUser {
  id?: string;
  createdAt?: Date | Number;
  email: string;
  password: string;
  isVerified?: boolean;
}

export interface IJsonUsers {
  users: IUser[];
}
