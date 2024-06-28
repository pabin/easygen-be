import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IUser } from 'src/users/schemas/user.schema';

import { UserLoginDto } from './dto/user-login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginResponse } from './interfaces/login-response.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private userModel: Model<IUser>,

    private readonly jwtService: JwtService,
  ) {}

  /**
   * Creates a new user.
   *
   * @param {CreateUserDto} createUserDto - Data transfer object for creating a user.
   * @returns {Promise<{ accessToken: string, refreshToken: string user: IUser }>} An object containing the JWT token and user details.
   * @throws {ConflictException} Throws ConflictException if the email already exists.
   * @throws {BadRequestException} Throws BadRequestException on other errors.
   */
  async userRegistration(createUserDto: CreateUserDto): Promise<LoginResponse> {
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

      return this.userLogin({ password, email: createUserDto.email });
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email address already exist !');
      } else {
        throw new BadRequestException('Registration Failed !!');
      }
    }
  }

  /**
   * Logs in a user with the provided email and password.
   *
   * @param {UserLoginDto} userLoginDto - Data transfer object for user login.
   * @returns {Promise<{ accessToken: string, refreshToken: string user: IUser }>} An object containing the JWT token and user details.
   * @throws {UnauthorizedException} If the email or password is incorrect.
   */
  // async userLogin(userLoginDto: UserLoginDto): Promise<IUser | null> {
  async userLogin(userLoginDto: UserLoginDto): Promise<LoginResponse> {
    const { email, password } = userLoginDto;

    const user = await this.userModel
      .findOne({ email })
      .select('+password')
      .exec();

    if (!user) {
      throw new UnauthorizedException('User acccont does not exist !');
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const refreshTokenLife = process.env.REFRESH_TOKEN_VALIDITY;
      const secret = process.env.REFRESH_TOKEN_SECRET;

      const payload: JwtPayload = { email: user.email };
      const accessToken: string = this.jwtService.sign(payload);

      const signOptions = { secret, expiresIn: refreshTokenLife };
      const refreshToken = this.jwtService.sign({ email }, signOptions);

      const userObject = user.toObject();
      delete userObject.password;

      return { user: userObject, accessToken, refreshToken };
    } else {
      throw new UnauthorizedException('Invalid login credentials !');
    }
  }

  /**
   * Refresh user access token.
   *
   * @param {IUser} user - The user object containing user information.
   * @returns {Promise<{ accessToken: string, user: IUser }>} An object containing the JWT token and user details.
   */
  async refreshAccessToken(user: IUser): Promise<Partial<LoginResponse>> {
    const { email } = user;

    const payload: JwtPayload = { email };
    const accessToken: string = this.jwtService.sign(payload);

    return { user, accessToken };
  }
}
