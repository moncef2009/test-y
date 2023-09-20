import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type EpointmentDocument = Epointment & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Epointment {
  id?: string;

  @Prop({ required: true, type: String })
  employee_identifier: string;

  @Prop({ required: true, type: Date })
  check_in: Date;

  @Prop({ type: Date })
  check_out: Date;

  @Prop({ required: true, type: String })
  comment: string;
}

export const EpointmentSchema = SchemaFactory.createForClass(Epointment);
