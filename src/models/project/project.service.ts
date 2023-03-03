import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from '../job/entities/job.entitty';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  // create project
  async create(inputs: CreateProjectDto) {
    const newProject = new Project();
    newProject.name = inputs.name;
    newProject.description = inputs.description;
    newProject.short_desc = inputs.short_desc;
    newProject.image = inputs.image;
    return await this.projectRepo.save(newProject);
  }

  // get all jobs
  async getAll() {
    return await this.projectRepo.find();
  }

  // get job by id
  async get(id: number) {
    return await this.projectRepo.findOne({ where: { id } });
  }

  // update project
  async update(id: number, inputs: UpdateProjectDto) {
    const project = await this.projectRepo.findOne({ where: { id } });
    project.name = inputs.name;
    project.description = inputs.description;
    project.short_desc = inputs.short_desc;
    project.image = inputs.image;
    return await this.projectRepo.save(project);
  }

  // delete job
  async delete(id: number) {
    return await this.projectRepo.delete({ id });
  }
}
