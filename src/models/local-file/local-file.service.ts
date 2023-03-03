import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { removeFile } from 'src/common/helpers';
import { Repository } from 'typeorm';
import { LocalFile } from './entities/local-file.entity';
import { ILocalFile } from './interfaces/local-file.interface';

@Injectable()
export class LocalFileService {
  constructor(
    @InjectRepository(LocalFile)
    private localFilesRepository: Repository<LocalFile>,
  ) {
  }

  async saveLocalFileData(fileData: ILocalFile): Promise<LocalFile> {
    const newFile = this.localFilesRepository.create(fileData);
    await this.localFilesRepository.save(newFile);
    return newFile;
  }

  async getFileByName(filename: string): Promise<LocalFile> {
    const file = await this.localFilesRepository.findOne({ where: { filename } });
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return file;
  }

  async deleteLocalFile(imageUrl?: string) {
    const filename = imageUrl?.split('/').pop();
    const file = await this.localFilesRepository.findOne({ where: { filename } });
    if (file) {
      await this.localFilesRepository.delete(file.id);
      removeFile(`${file.destination}/${file.filename}`);
    }
  }
}
