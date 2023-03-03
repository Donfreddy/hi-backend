import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Project name', required: true })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Project description',
    required: true,
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Project short description',
    required: true,
  })
  short_desc: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Project link', required: true })
  link: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Project date', required: true })
  date: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Project client name',
    required: true,
  })
  client_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Project client location',
    required: false,
  })
  client_location: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Project image', required: true })
  image: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Project image mini',
    required: true,
  })
  image_mini: string;
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
