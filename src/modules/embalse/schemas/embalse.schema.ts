import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IEmbalse } from '../interfaces/embalse.interface';

export type EmbalseDocument = Embalse & Document;

@Schema()
export class Embalse implements IEmbalse {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  capacidad: number;

  @Prop({ required: true })
  provincia: string;
}

export const EmbalseSchema = SchemaFactory.createForClass(Embalse);
