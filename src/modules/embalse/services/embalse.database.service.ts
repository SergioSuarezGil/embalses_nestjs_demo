import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Embalse } from '../schemas/embalse.schema';
import { Repository } from '../../../common/classes/repository.class';
import { IEmbalse } from '../interfaces/embalse.interface';
import { CreateEmbalseDto } from '../dto/create-embalse.dto';
import { UpdateEmbalseDto } from '../dto/update-embalse.dto';
import { embalsesMock } from '../mocks/embalses.mock';

@Injectable()
export class EmbalseDatabaseService
  implements Repository<IEmbalse>, OnModuleInit
{
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

  private toEntity(doc: Embalse): IEmbalse {
    return {
      id: (doc as any)._id.toString(),
      nombre: doc.nombre,
      capacidad: doc.capacidad,
      provincia: doc.provincia,
    };
  }

  async create(dto: CreateEmbalseDto): Promise<IEmbalse> {
    const doc = await this.model.create(dto);
    return this.toEntity(doc);
  }

  async findAll(): Promise<IEmbalse[]> {
    const docs = await this.model.find().exec();
    return docs.map(this.toEntity);
  }

  async findOne(id: string): Promise<IEmbalse | null> {
    const parsedId = this.parseId(id);
    if (!parsedId) return null;
    const doc = await this.model.findById(parsedId).exec();
    return doc ? this.toEntity(doc) : null;
  }

  async update(id: string, dto: UpdateEmbalseDto): Promise<IEmbalse | null> {
    const parsedId = this.parseId(id);
    if (!parsedId) return null;
    const doc = await this.model
      .findByIdAndUpdate(parsedId, dto, { new: true })
      .exec();
    return doc ? this.toEntity(doc) : null;
  }

  async replace(id: string, dto: CreateEmbalseDto): Promise<IEmbalse | null> {
    const parsedId = this.parseId(id);
    if (!parsedId) return null;
    const doc = await this.model
      .findOneAndReplace({ _id: parsedId }, dto, { new: true })
      .exec();
    return doc ? this.toEntity(doc) : null;
  }

  async delete(id: string): Promise<IEmbalse | null> {
    const parsedId = this.parseId(id);
    if (!parsedId) return null;
    const doc = await this.model.findByIdAndDelete(parsedId).exec();
    return doc ? this.toEntity(doc) : null;
  }
}
