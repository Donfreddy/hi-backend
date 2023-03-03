import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Software Engineer' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Software Engineer' })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Software Engineer' })
  caditate_desc: string;

  @IsOptional()
  @ApiProperty({ type: 'string', example: 'Software Engineer' })
  advantages: string[];

  // @IsOptional()
  // @ApiProperty({ type: 'string', example: 'Software Engineer' })
  // requirements: string[];

  // @IsOptional()
  // @ApiProperty({ type: 'string', example: 'Software Engineer' })
  // responsibilities: string[];

  // @IsOptional()
  // @ApiProperty({ type: 'string', example: 'Software Engineer' })
  // skills: string[];

  @IsOptional()
  @ApiProperty({ type: 'string', example: 'Software Engineer' })
  dealine: string;
}

export class UpdateJobDto extends PartialType(CreateJobDto) {
}
