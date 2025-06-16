import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Repository } from '../../../common/classes/repository.class';
import { CreateEmbalseDto } from '../dto/create-embalse.dto';
import { UpdateEmbalseDto } from '../dto/update-embalse.dto';
import { embalsesMock } from '../../../common/mocks/embalses.mock';
import { IEmbalse } from '../interfaces/embalse.interface';

@Injectable()
export class EmbalseMemoryService implements Repository<IEmbalse> {
  private embalses = new Map<string, IEmbalse>();

  constructor() {
    embalsesMock.forEach((dto) => {
      const id = randomUUID();
      this.embalses.set(id, { id, ...dto });
    });
  }
  async create(dto: CreateEmbalseDto): Promise<IEmbalse> {
    const id = randomUUID();
    const newEmbalse: IEmbalse = { id, ...dto };
    this.embalses.set(id, newEmbalse);
    return newEmbalse;
  }

  async findAll(): Promise<IEmbalse[]> {
    return Array.from(this.embalses.values());
  }

  async findOne(id: string): Promise<IEmbalse | null> {
    return this.embalses.get(id) ?? null;
  }

  async update(id: string, dto: UpdateEmbalseDto): Promise<IEmbalse | null> {
    const existing = this.embalses.get(id);
    if (!existing) return null;
    const updated: IEmbalse = { ...existing, ...dto };
    this.embalses.set(id, updated);
    return updated;
  }

  async replace(id: string, dto: CreateEmbalseDto): Promise<IEmbalse | null> {
    if (!this.embalses.has(id)) return null;
    const newEmbalse: IEmbalse = { id, ...dto };
    this.embalses.set(id, newEmbalse);
    return newEmbalse;
  }

  async delete(id: string): Promise<IEmbalse | null> {
    const embalse = this.embalses.get(id);
    if (!embalse) return null;
    this.embalses.delete(id);
    return embalse;
  }
}
