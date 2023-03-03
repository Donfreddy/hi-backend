import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import slugify from 'slugify';
import * as shortid from 'shortid';
import * as crypto from 'crypto';
import { configService } from '../../config/config.service';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Token } from 'src/models/token/token.entity';

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

export const comparePasswords = async (
  userPassword: string,
  currentPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(userPassword, currentPassword);
};

export const slugOrIdWhereCondition = (
  slug: string,
): { [key: string]: string | number } => {
  const id = parseInt(slug);
  if (isNaN(id)) return { slug };
  return { id };
};

export const getFileExtension = (fileName: string): string => {
  return fileName.split('.')[fileName.split('.').length - 1];
};

export const generateUniqueKey = (): string => {
  const currentTime = new Date().getTime().toString();
  const randomString =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  return `${randomString}_${currentTime}`;
};

export const getImageUrl = (fileName: string): string => {
  return `${configService.getAPiUrl()}/images/${fileName}`;
};

  export const isTokenExpired = (token: Token): boolean => {
  const { created_at, expired_at } = token;

  const diffNow = Date.now() - created_at.getTime();
  const diff = expired_at.getTime() - created_at.getTime();

  return Math.round(diffNow / 60000) > Math.round(diff / 60000);
  };

export const generateUniqueToken = async (): Promise<string> => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  return await bcrypt.hash(resetToken, saltRounds);
};

export const removeFile = (filePath: string): void => {
  fs.unlink(filePath, (err) => {
    if (err) {
      throw new HttpException('Error deleting file', 500);
    }
  });
};

// hash an email address
export const hashEmail = (email: string) => {
  return crypto.createHash('sha256').update(email).digest('hex');
};

// slugify a string
export const slugifyString = (slug: string): string => {
  return `${slugify(slug) + `-${shortid.generate()}`}`.toLowerCase();
};
