import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { TokenService } from 'src/models/token/token.service';
import { UserService } from 'src/models/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from 'src/models/token/token.entity';
import { User } from 'src/models/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Token])],
  controllers: [AuthController],
  providers: [AuthService, JwtService, MailService, TokenService, UserService],
})
export class AuthModule {}
