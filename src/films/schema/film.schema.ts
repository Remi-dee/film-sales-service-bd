import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FilmDocument = Film & Document;

@Schema({ timestamps: true })
export class Film {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  genre: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  releaseDate: Date;
}

export const FilmSchema = SchemaFactory.createForClass(Film);
