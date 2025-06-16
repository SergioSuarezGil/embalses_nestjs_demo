import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { EmbalseService } from './interfaces/embalse.service.interface';
import { CreateEmbalseDto } from '../dto/create-embalse.dto';
import { UpdateEmbalseDto } from '../dto/update-embalse.dto';
import { embalsesMock } from '../mocks/embalses.mock';

@Injectable()
export class EmbalseMemoryService implements EmbalseService {
  private embalses = new Map<string, any>();

  constructor() {
    embalsesMock.forEach((dto) => {
      const id = randomUUID();
      this.embalses.set(id, { id, ...dto });
    });
  }

  create(dto: CreateEmbalseDto) {
    const id = randomUUID();
    const newEmbalse = { id, ...dto };
    this.embalses.set(id, newEmbalse);
    return newEmbalse;
  }

  findAll() {
    return Array.from(this.embalses.values());
  }

  findOne(id: string) {
    return this.embalses.get(id) ?? null;
  }

  update(id: string, dto: UpdateEmbalseDto) {
    const existing = this.embalses.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...dto };
    this.embalses.set(id, updated);
    return updated;
  }

  replace(id: string, dto: CreateEmbalseDto) {
    if (!this.embalses.has(id)) return null;
    const newEmbalse = { id, ...dto };
    this.embalses.set(id, newEmbalse);
    return newEmbalse;
  }

  delete(id: string) {
    const embalse = this.embalses.get(id);
    if (!embalse) return null;
    this.embalses.delete(id);
    return embalse;
  }
}
