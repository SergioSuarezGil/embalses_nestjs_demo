import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { IEmbalseService } from './interfaces/embalse.service.interface';
import { CreateEmbalseDto } from '../dto/create-embalse.dto';
import { UpdateEmbalseDto } from '../dto/update-embalse.dto';
import { embalsesMock } from '../mocks/embalses.mock';

@Injectable()
export class EmbalseMemoryService implements IEmbalseService {
  private embalses: any[] = [];

  constructor() {
    this.embalses = embalsesMock.map((embalse) => ({
      id: randomUUID(),
      ...embalse,
    }));
  }

  create(dto: CreateEmbalseDto) {
    const newEmbalse = { id: randomUUID(), ...dto };
    this.embalses.push(newEmbalse);
    return newEmbalse;
  }

  findAll() {
    return this.embalses;
  }

  findOne(id: string) {
    return this.embalses.find((e) => e.id === id);
  }

  update(id: string, dto: UpdateEmbalseDto) {
    const embalse = this.findOne(id);
    if (!embalse) return null;
    Object.assign(embalse, dto);
    return embalse;
  }

  replace(id: string, dto: CreateEmbalseDto) {
    const index = this.embalses.findIndex((e) => e.id === id);
    if (index === -1) return null;
    const newEmbalse = { id, ...dto };
    this.embalses[index] = newEmbalse;
    return newEmbalse;
  }

  delete(id: string) {
    const index = this.embalses.findIndex((e) => e.id === id);
    if (index === -1) return null;
    return this.embalses.splice(index, 1)[0];
  }
}
