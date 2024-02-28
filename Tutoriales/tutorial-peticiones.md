# Tutorial: Realizar peticiones GET, POST, PUT y DELETE en NestJS

## Paso 1: Definir los modelos (si es necesario)

Si no tenemos modelos definidos, podemos crearlos en archivos como post.model.ts y request-log.model.ts para definir la estructura de nuestros datos.


``` ts
// post.model.ts:

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
```

``` ts
// request-log.model.ts:

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RequestLog extends Document {
  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true })
  statusCode: number;

  @Prop({ required: true })
  contentLength: number;

  @Prop({ required: true })
  elapsedTime: number;

  @Prop({ required: true })
  userAgent: string;

  @Prop({ required: true })
  ip: string;
}

export const RequestLogSchema = SchemaFactory.createForClass(RequestLog);
```
## Paso 2: Crear los servicios

En los archivos posts.service.ts y request-log.service.ts, implementaremos la lógica para interactuar con la base de datos y manejar las solicitudes entrantes.


``` ts
//posts.service.ts:

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './post.model';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findById(id: string): Promise<Post> {
    return this.postModel.findById(id).exec();
  }

  async create(post: Post): Promise<Post> {
    const newPost = new this.postModel(post);
    return newPost.save();
  }

  async update(id: string, post: Post): Promise<Post> {
    return this.postModel.findByIdAndUpdate(id, post, { new: true }).exec();
  }

  async delete(id: string): Promise<Post> {
    return this.postModel.findByIdAndDelete(id).exec();
  }
}
```

``` ts
//request-log.service.ts:

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RequestLog } from './request-log.model';

@Injectable()
export class RequestLogService {
  constructor(@InjectModel(RequestLog.name) private requestLogModel: Model<RequestLog>) {}

  async findAll(): Promise<RequestLog[]> {
    return this.requestLogModel.find().exec();
  }

  async findById(id: string): Promise<RequestLog> {
    return this.requestLogModel.findById(id).exec();
  }

  async create(requestLog: RequestLog): Promise<RequestLog> {
    const newRequestLog = new this.requestLogModel(requestLog);
    return newRequestLog.save();
  }

  async update(id: string, requestLog: RequestLog): Promise<RequestLog> {
    return this.requestLogModel.findByIdAndUpdate(id, requestLog, { new: true }).exec();
  }

  async delete(id: string): Promise<RequestLog> {
    return this.requestLogModel.findByIdAndDelete(id).exec();
  }
}
```
## Paso 3: Implementar los controladores

En los archivos posts.controller.ts y request-log.controller.ts, definiremos los puntos finales de la API y conectaremos las solicitudes HTTP entrantes a los métodos correspondientes en nuestros servicios.