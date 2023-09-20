import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type EmployeeDocument = Employee & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Employee {
  id?: string;

  @Prop({ required: true, type: String })
  lastName: string;

  @Prop({ required: true, type: String })
  firstName: string;

  @Prop({ required: true, type: Date })
  dateCreated: Date;

  @Prop({ required: true, type: String })
  department: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
