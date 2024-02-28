// post.model.ts
import { Schema, Document } from 'mongoose';

export interface Post extends Document {
  title: string;
  content: string;
}

export const PostSchema = new Schema<Post>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true }, // Definir explícitamente _id como ObjectId
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true },
); // Añadir timestamps para createdAt y updatedAt
