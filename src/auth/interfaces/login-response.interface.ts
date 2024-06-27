import { IUser } from 'src/users/schemas/user.schema';

export interface LoginResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}
