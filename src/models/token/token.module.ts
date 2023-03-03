import { TokenService } from './token.service';
import { Module } from '@nestjs/common';
import { Token } from './token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  controllers: [],
  providers: [TokenService],
})
export class TokenModule {}
