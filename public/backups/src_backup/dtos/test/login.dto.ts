import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Username or email is required' })
  @IsString()
  usernameOrEmail: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password: string;
}
