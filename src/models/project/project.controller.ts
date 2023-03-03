import { ProjectService } from './project.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResponseMessage } from 'src/common/decorators/response.decorator';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly project: ProjectService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Project created successfully.')
  createBlog(@Body() inputs: CreateProjectDto) {
    return this.project.create(inputs);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get all projects successfully.')
  async getAllJobs(): Promise<any> {
    return await this.project.getAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get project successfully.')
  async getJob(@Param('id', ParseIntPipe) jobId: number): Promise<any> {
    return await this.project.get(jobId);
  }

  @Put('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Update project successfully.')
  async updateJob(
    @Param('id', ParseIntPipe) jobId: number,
    @Body() inputs: UpdateProjectDto,
  ): Promise<any> {
    return await this.project.update(jobId, inputs);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Project deleted successfully.')
  async deleteJob(@Param('id', ParseIntPipe) jobId: number): Promise<any> {
    return await this.project.delete(jobId);
  }
}
