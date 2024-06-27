import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IUser } from 'src/users/schemas/user.schema';

import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  /**
   * Creates a new user.
   *
   * @param {CreateUserDto} createUserDto - Data transfer object for creating a user.
   * @returns {Promise<IUser>} The created user.
   * @throws {ConflictException} Throws ConflictException if the email already exists.
   * @throws {BadRequestException} Throws BadRequestException on other errors.
   */
  async userRegistration(createUserDto: CreateUserDto): Promise<IUser> {
    const { password, ...rest } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = new this.userModel({
      ...rest,
      password: hashedPassword,
    });

    try {
      const user = await createdUser.save();
      const userObject = user.toObject();
      delete userObject.password;

      return userObject;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email address already exist !');
      } else {
        throw new BadRequestException('Registration Failed !!');
      }
    }
  }

  async userLogin(userLoginDto: UserLoginDto) {
    console.log('userLoginDto', userLoginDto);
  }
}
