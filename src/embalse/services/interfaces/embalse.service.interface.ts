import { CreateEmbalseDto } from '../../dto/create-embalse.dto';
import { UpdateEmbalseDto } from '../../dto/update-embalse.dto';

export interface IEmbalseService {
  create(dto: CreateEmbalseDto): any;
  findAll(): any;
  findOne(id: string): any;
  update(id: string, dto: UpdateEmbalseDto): any;
  replace(id: string, dto: CreateEmbalseDto): any;
  delete(id: string): any;
}
