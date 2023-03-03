import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Module } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
