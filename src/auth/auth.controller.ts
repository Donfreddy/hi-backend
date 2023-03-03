import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { CreateUserDto } from 'src/models/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('User registered successfully.')
  @ApiOperation({ summary: 'Register a new user.' })
  @ApiBody({ description: 'Register a new user', type: CreateUserDto })
  async registerUser(@Body() inputs: CreateUserDto): Promise<any> {
    return await this.auth.register(inputs);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('User logged in successfully.')
  @ApiOperation({ summary: 'Login user with his email and password.' })
  @ApiBody({ description: 'Login user in to the system', type: LoginDto })
  async loginUser(@Body() inputs: LoginDto): Promise<any> {
    return await this.auth.login(inputs);
  }

  @Post('/forgot-password')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('A link has been sent to your email.')
  @ApiOperation({ summary: 'Send an email to user to reset his password.' })
  @ApiBody({ description: 'Forgot password', type: ForgotPasswordDto })
  async forgotPassword(@Body() inputs: ForgotPasswordDto): Promise<any> {
    return await this.auth.forgotPassword(inputs);
  }

  @Post('/reset-password')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Reset password successfully.')
  @ApiOperation({ summary: 'Reset user password' })
  @ApiBody({ description: 'Reset password', type: ResetPasswordDto })
  async resetPassword(@Body() inputs: ResetPasswordDto): Promise<any> {
    return await this.auth.resetPassword(inputs);
  }
}
