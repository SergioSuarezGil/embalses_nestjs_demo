import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Embalse } from '../schemas/embalse.schema';
import { Repository } from '../../common/interfaces/repository.interface';
import { CreateEmbalseDto } from '../dto/create-embalse.dto';
import { UpdateEmbalseDto } from '../dto/update-embalse.dto';
import { embalsesMock } from '../../common/mocks/embalses.mock';

@Injectable()
export class EmbalseMongoService implements Repository, OnModuleInit {
  private readonly logger = new Logger('EmbalseMongoService');

  constructor(@InjectModel(Embalse.name) private model: Model<Embalse>) {}

  async onModuleInit() {
    const count = await this.model.estimatedDocumentCount();
    if (count === 0) {
      await this.model.insertMany(embalsesMock);
      this.logger.log('MongoDB seeded with default embalses');
    }
  }

  private parseId(id: string) {
    return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
  }

  create(dto: CreateEmbalseDto) {
    return this.model.create(dto);
  }

  findAll() {
    return this.model.find().exec();
  }

  async findOne(id: string) {
    const parsedId = this.parseId(id);
    if (!parsedId) return null;
    return this.model.findById(parsedId).exec();
  }

  async update(id: string, dto: UpdateEmbalseDto) {
    const parsedId = this.parseId(id);
    if (!parsedId) return null;
    return this.model.findByIdAndUpdate(parsedId, dto, { new: true }).exec();
  }

  async replace(id: string, dto: CreateEmbalseDto) {
    const parsedId = this.parseId(id);
    if (!parsedId) return null;
    return this.model
      .findOneAndReplace({ _id: parsedId }, dto, { new: true })
      .exec();
  }

  async delete(id: string) {
    const parsedId = this.parseId(id);
    if (!parsedId) return null;
    return this.model.findByIdAndDelete(parsedId).exec();
  }
}
