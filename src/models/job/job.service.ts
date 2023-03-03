import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from '../job/entities/job.entitty';
import { CreateJobDto, UpdateJobDto } from './dto/job.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepo: Repository<Job>,
  ) {}

  // create job
  async create(inputs: CreateJobDto) {
    const newJob = new Job();
    newJob.title = inputs.title;
    newJob.description = inputs.description;
    newJob.caditate_desc = inputs.caditate_desc;
    newJob.advantages = inputs.advantages;
    newJob.dealine = new Date(inputs.dealine);
    return await this.jobRepo.save(newJob);
  }

  // get all jobs
  async getAll() {
    return await this.jobRepo.find();
  }

  // get job by id
  async get(id: number) {
    return await this.jobRepo.findOne({ where: { id } });
  }

  // update job
  async update(id: number, inputs: UpdateJobDto) {
    const job = await this.jobRepo.findOne({ where: { id } });
    job.title = inputs.title;
    job.description = inputs.description;
    job.caditate_desc = inputs.caditate_desc;
    job.advantages = inputs.advantages;
    if (inputs.dealine) job.dealine = new Date(inputs.dealine);
    return await this.jobRepo.save(job);
  }

  // delete job
  async delete(id: number) {
    return await this.jobRepo.delete({ id });
  }
}
