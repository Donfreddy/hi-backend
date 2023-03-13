import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { TokenService } from 'src/models/token/token.service';
import { UserService } from 'src/models/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from 'src/models/token/token.entity';
import { User } from 'src/models/user/entities/user.entity';
import { configService } from 'src/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Token]),
    JwtModule.register({
      secret: configService.getJWT().secretKey,
      signOptions: {
        expiresIn: configService.getJWT().expiresIn,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, MailService, TokenService, UserService],
})
export class AuthModule {}
