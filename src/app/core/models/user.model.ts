import { UserType } from '../enums';

export class User {
  id: number;
  email: string;
  userType: UserType;
  password?: string;
  constructor(
    id: number,
    email: string,
    userType: UserType,
    password?: string
  ) {
    this.id = id;
    this.email = email;
    this.userType = userType;
    this.password = password;
  }
}
