import { JobController } from './job.controller';
import { JobService } from './job.service';
import { Module } from '@nestjs/common';
import { Job } from './entities/job.entitty';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
