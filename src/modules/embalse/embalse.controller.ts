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
import { Repository } from '../../common/interfaces/repository.interface';
import { CreateEmbalseDto } from './dto/create-embalse.dto';
import { UpdateEmbalseDto } from './dto/update-embalse.dto';

@Controller('embalses')
export class EmbalseController {
  constructor(private readonly embalseRepository: Repository) {}

  @Post()
  create(@Body() dto: CreateEmbalseDto) {
    return this.embalseRepository.create(dto);
  }

  @Get()
  findAll() {
    return this.embalseRepository.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const embalse = await this.embalseRepository.findOne(id);
    if (!embalse) {
      throw new NotFoundException(`Reservoir with id ${id} not found`);
    }
    return embalse;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateEmbalseDto) {
    const updated = await this.embalseRepository.update(id, dto);
    if (!updated) {
      throw new NotFoundException(`Reservoir with id ${id} not found`);
    }
    return updated;
  }

  @Put(':id')
  async replace(@Param('id') id: string, @Body() dto: CreateEmbalseDto) {
    const replaced = await this.embalseRepository.replace(id, dto);
    if (!replaced) {
      throw new NotFoundException(`Reservoir with id ${id} not found`);
    }
    return replaced;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.embalseRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Reservoir with id ${id} not found`);
    }
    return deleted;
  }
}
