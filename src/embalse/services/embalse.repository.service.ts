import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Embalse } from '../schemas/embalse.schema';
import { IEmbalseService } from './interfaces/embalse.service.interface';
import { CreateEmbalseDto } from '../dto/create-embalse.dto';
import { UpdateEmbalseDto } from '../dto/update-embalse.dto';
import { embalsesMock } from '../mocks/embalses.mock';

@Injectable()
export class EmbalseMongoService implements IEmbalseService, OnModuleInit {
  private readonly logger = new Logger('EmbalseMongoService');

  constructor(@InjectModel(Embalse.name) private model: Model<Embalse>) {}

  async onModuleInit() {
    const count = await this.model.estimatedDocumentCount();
    if (count === 0) {
      await this.model.insertMany(embalsesMock);
      this.logger.log('MongoDB seeded with default embalses');
    }
  }

  create(dto: CreateEmbalseDto) {
    return this.model.create(dto);
  }

  findAll() {
    return this.model.find().exec();
  }

  findOne(id: string) {
    return this.model.findById(id).exec();
  }

  update(id: string, dto: UpdateEmbalseDto) {
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  replace(id: string, dto: CreateEmbalseDto) {
    return this.model.findOneAndReplace({ _id: id }, dto, { new: true }).exec();
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }
}
