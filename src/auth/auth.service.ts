import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
  userRegistration(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  userLogin(userLoginDto: UserLoginDto) {
    console.log('userLoginDto', userLoginDto);

    return `This action returns all users`;
  }
}
