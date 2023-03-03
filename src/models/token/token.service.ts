import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepo: Repository<Token>,
  ) {}

  // create a new token
  async createToken(token: Token): Promise<Token> {
    return await this.tokenRepo.save(token);
  }

  // get a token by token
  async getToken(token: string): Promise<Token> {
    return await this.tokenRepo.findOne({ where: { token } });
  }

  // update a token
  async updateToken(token: Token): Promise<Token> {
    return await this.tokenRepo.save(token);
  }

  // get a token by user
  async getTokenByUser(user: User): Promise<Token> {
    return await this.tokenRepo.findOne({ where: { user } });
  }
}
