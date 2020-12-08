import { UserType } from '../enums';

export class RegisterUser {
  email: string;
  password: string;
  userType: UserType;

  constructor(email: string, password: string, userType: UserType) {
    this.email = email;
    this.password = password;
    this.userType = userType;
  }
}
