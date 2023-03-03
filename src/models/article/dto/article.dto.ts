import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Blog title', required: true })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Blog description', required: false })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Some content description',
    required: true,
  })
  content: string;

  @IsNotEmpty()
  @ApiProperty({ example: ['Economic'], required: false })
  tags: string[];

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    example: 'Blog image',
    required: false,
    format: 'binary',
  })
  image: Express.Multer.File;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Finance', required: false })
  category: string;
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
