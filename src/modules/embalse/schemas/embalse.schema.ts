import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Embalse extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  capacidad: number;

  @Prop({ required: true })
  provincia: string;
}

export const EmbalseSchema = SchemaFactory.createForClass(Embalse);
