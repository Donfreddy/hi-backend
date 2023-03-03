import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SubscribeDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'johndoe@gmail.com' })
  email: string;
}

export class SendNewLetterDto {
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Hello World' })
  content: string;


  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Hello World' })
  subject: string;
}
