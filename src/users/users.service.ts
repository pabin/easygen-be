import { Injectable } from '@nestjs/common';
import { IUser } from './schemas/user.schema';

@Injectable()
export class UsersService {
  /**
   * Demo method to show auth validation with AuthGuard.
   *
   * @param {IUser} user - The user object containing user information.
   * @returns {string} A greeting message indicating the user is authenticated.
   */
  helloWorld(user: IUser): string {
    return `Hi, ${user.firstName} is authenticated !!`;
  }
}
