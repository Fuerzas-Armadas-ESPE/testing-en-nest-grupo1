// request-log.model.ts
import * as mongoose from 'mongoose';

export const RequestLogSchema = new mongoose.Schema({
  method: String,
  path: String,
  // ... otras propiedades ...
});

export interface RequestLogModel extends mongoose.Document {
  method: string;
  path: string;
  // ... otras propiedades ...
}

// Exporta el modelo para su uso en otros archivos
export const RequestLogModel = mongoose.model<RequestLogModel>(
  'RequestLog',
  RequestLogSchema,
);
