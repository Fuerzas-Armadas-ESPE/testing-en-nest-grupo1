import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './post.model';

@Injectable()
export class PostsService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async getAllPosts(): Promise<Post[]> {
    return await this.postModel.find().exec();
  }

  async getPost(id: string): Promise<Post | null> {
    try {
      const post = await this.postModel.findById(id).exec();
      if (!post) {
        throw new NotFoundException('Publicación no encontrada');
      }
      return post;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createPost(postData: any): Promise<Post> {
    try {
      const createdPost = new this.postModel(postData); // No es necesario asignar _id manualmente
      return await createdPost.save();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updatePost(id: string, postData: any): Promise<Post | null> {
    try {
      const existingPost = await this.postModel.findById(id).exec();
      if (!existingPost) {
        throw new NotFoundException('Publicación no encontrada');
      }

      // Actualizar los campos de la publicación existente
      existingPost.title = postData.title;
      existingPost.content = postData.content;

      // Guardar los cambios en la base de datos
      return await existingPost.save();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deletePost(id: string): Promise<void> {
    try {
      await this.postModel.findByIdAndDelete(id).exec();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
