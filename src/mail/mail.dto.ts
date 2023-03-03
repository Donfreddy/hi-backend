import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// create contact dto
export class ContactDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Donacien M', required: true })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'donacienm@ex.com', required: true })
  email: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: '698694738', required: false })
  phone: string;
}

export class MailDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Donacien M', required: true })
  subject: string;

  @ApiProperty({ required: true })
  contact: ContactDto;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Some content', required: true })
  body: string;
}
