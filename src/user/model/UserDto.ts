import { User } from './User.entity';

export class UserDto {
  username: string;
  password: string;
  email: string;

  constructor(body: any) {
    this.username = body.username;
    this.password = body.password;
    this.email = body.email;
  }

  createUser(): User {
    const user: User = new User();
    user.username = this.username;
    user.password = this.password;
    user.email = this.email;

    return user;
  }
}
