import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Repository } from '../../common/classes/repository.class';
import { CreateEmbalseDto } from './dto/create-embalse.dto';
import { UpdateEmbalseDto } from './dto/update-embalse.dto';
import { IEmbalse } from './interfaces/embalse.interface';

@Controller('embalses')
export class EmbalseController {
  constructor(private readonly embalseRepository: Repository<IEmbalse>) {}

  @Post()
  create(@Body() dto: CreateEmbalseDto): Promise<IEmbalse> {
    return this.embalseRepository.create(dto);
  }

  @Get()
  findAll(): Promise<IEmbalse[]> {
    return this.embalseRepository.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IEmbalse> {
    const embalse = await this.embalseRepository.findOne(id);
    if (!embalse) {
      throw new NotFoundException(`Reservoir with id ${id} not found`);
    }
    return embalse;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateEmbalseDto,
  ): Promise<IEmbalse> {
    const updated = await this.embalseRepository.update(id, dto);
    if (!updated) {
      throw new NotFoundException(`Reservoir with id ${id} not found`);
    }
    return updated;
  }

  @Put(':id')
  async replace(
    @Param('id') id: string,
    @Body() dto: CreateEmbalseDto,
  ): Promise<IEmbalse> {
    const replaced = await this.embalseRepository.replace(id, dto);
    if (!replaced) {
      throw new NotFoundException(`Reservoir with id ${id} not found`);
    }
    return replaced;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IEmbalse> {
    const deleted = await this.embalseRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Reservoir with id ${id} not found`);
    }
    return deleted;
  }
}
