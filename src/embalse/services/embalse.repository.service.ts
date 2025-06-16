import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Embalse } from '../schemas/embalse.schema';
import { IEmbalseService } from './interfaces/embalse.service.interface';
import { CreateEmbalseDto } from '../dto/create-embalse.dto';
import { UpdateEmbalseDto } from '../dto/update-embalse.dto';

@Injectable()
export class EmbalseMongoService implements IEmbalseService {
  constructor(@InjectModel(Embalse.name) private model: Model<Embalse>) {}

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
