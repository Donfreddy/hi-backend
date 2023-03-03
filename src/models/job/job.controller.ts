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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { CreateJobDto } from './dto/job.dto';
import { JobService } from './job.service';

@ApiTags('jobs')
@Controller('jobs')
export class JobController {
  constructor(private readonly job: JobService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Blog created successfully.')
  createBlog(@Body() inputs: CreateJobDto) {
    return this.job.create(inputs);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get all jobs successfully.')
  async getAllJobs(): Promise<any> {
    return await this.job.getAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get job successfully.')
  async getJob(@Param('id', ParseIntPipe) jobId: number): Promise<any> {
    return await this.job.get(jobId);
  }

  @Put('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Update job successfully.')
  async updateJob(
    @Param('id', ParseIntPipe) jobId: number,
    @Body() inputs: CreateJobDto,
  ): Promise<any> {
    return await this.job.update(jobId, inputs);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Job deleted successfully.')
  async deleteJob(@Param('id', ParseIntPipe) jobId: number): Promise<any> {
    return await this.job.delete(jobId);
  }
}
