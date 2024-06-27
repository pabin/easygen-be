import { Injectable } from '@nestjs/common';
import { IUser } from './schemas/user.schema';

@Injectable()
export class UsersService {
  async helloWorld(user: IUser): Promise<string> {
    return `Hi, ${user.firstName} is authenticated !!`;
  }
}
