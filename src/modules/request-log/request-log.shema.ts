import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RequestLog {
  @Prop({ required: true })
  method: string = '';

  @Prop({ required: true })
  originalUrl: string = '';

  @Prop({ required: true })
  statusCode: number = 0;

  @Prop({ required: true })
  contentLength: number = 0;

  @Prop({ required: true })
  elapsedTime: number = 0;

  @Prop({ required: true })
  userAgent: string = '';

  @Prop({ required: true })
  ip: string = '';
}

export type RequestLogDocument = RequestLog & Document;

export const RequestLogSchema = SchemaFactory.createForClass(RequestLog);
