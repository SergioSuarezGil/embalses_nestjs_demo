import { PartialType } from '@nestjs/mapped-types';
import { CreateEmbalseDto } from './create-embalse.dto';

export class UpdateEmbalseDto extends PartialType(CreateEmbalseDto) {}
