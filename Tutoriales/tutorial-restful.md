# Desarrollo de Endpoints RESTful en Nest.js

En este tutorial, aprenderemos cómo desarrollar endpoints RESTful en Nest.js, un marco de trabajo de Node.js para la construcción de aplicaciones escalables y eficientes en el lado del servidor. Cubriremos los conceptos clave y desarrollaremos una API RESTful para gestionar un sistema de publicaciones.

## Conceptos importantes

### ¿Qué son los endpoints RESTful?

Los endpoints RESTful son URLs que representan recursos en una aplicación web y permiten realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en esos recursos utilizando métodos HTTP estándar.

### Principios de diseño RESTful

- **Identificación de recursos:** Cada recurso en una API RESTful debe tener una URL única que lo identifique.
- **Manipulación de recursos a través de representaciones:** Los recursos pueden ser representados en diferentes formatos como JSON, XML o HTML.
- **Navegación entre recursos:** Las relaciones entre recursos se establecen utilizando hipervínculos.

- **Independencia de estado entre solicitudes:** Cada solicitud a un endpoint RESTful debe contener toda la información necesaria para completar la operación.

### Creación de rutas y controladores en Nest.js

En Nest.js, las rutas se definen utilizando el decorador @Controller y los controladores se crean utilizando clases decoradas con @Controller.

### Implementación de métodos HTTP (GET, POST, PUT, DELETE)

Los métodos HTTP GET, POST, PUT y DELETE se implementan en controladores de Nest.js utilizando los decoradores correspondientes (@Get, @Post, @Put, @Delete).

### Validación de datos de entrada

La validación de datos de entrada se puede realizar utilizando bibliotecas de validación como class-validator o implementando validaciones personalizadas en los pipes de Nest.js.

### Manejo de errores y códigos de estado HTTP

El manejo de errores se realiza utilizando excepciones personalizadas en Nest.js, que pueden devolver códigos de estado HTTP adecuados en función del tipo de error.

### Serialización y deserialización de datos

La serialización y deserialización de datos se realiza automáticamente en Nest.js utilizando la biblioteca class-transformer para convertir objetos a y desde DTOs (objetos de transferencia de datos).

### Uso de decoradores y pipes en Nest.js

Los decoradores y pipes se utilizan para agregar funcionalidades adicionales a los controladores y servicios de Nest.js, como la validación de datos, la transformación de objetos y la autorización de acceso.

## Implementación paso a paso

### **Paso 1:** Configuración del entorno

Asegúrate de tener Node.js y npm instalados en tu sistema. Luego, crea un nuevo proyecto Nest.js utilizando el CLI de Nest.js:

``` bash
nest new nest-rest-api
```
### **Paso 2:** Definición del modelo de datos

Crea un modelo de datos para representar las publicaciones en tu API. Por ejemplo, en src/posts/post.model.ts:

``` ts
import { Schema, Document } from 'mongoose';

export interface Post extends Document {
  title: string;
  content: string;
}

export const PostSchema = new Schema<Post>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true },
);
```
### **Paso 3:** Creación del servicio de publicaciones

Crea un servicio para manejar la lógica de negocio relacionada con las publicaciones. En src/posts/posts.service.ts:

``` ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './post.model';

@Injectable()
export class PostsService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  // Implementa métodos para obtener, crear, actualizar y eliminar publicaciones
}
```
#### **Paso 4:** Creación del controlador de publicaciones

Crea un controlador para definir los endpoints de la API relacionados con las publicaciones. En src/posts/posts.controller.ts:

``` ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Implementa métodos para los endpoints GET, POST, PUT y DELETE
}
```
### **Paso 5:** Configuración del módulo de publicaciones

Configura el módulo de Nest.js para importar el modelo de datos y los controladores. En src/posts/posts.module.ts:

``` ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostSchema } from './post.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
```
### **Paso 6:** Prueba de la API

Inicia el servidor Nest.js y prueba los endpoints de la API utilizando herramientas como Postman o cURL.

``` bash
npm run start:dev
```

## Conclusión

En este tutorial, hemos aprendido cómo desarrollar endpoints RESTful en Nest.js utilizando los principios de diseño RESTful y las características proporcionadas por Nest.js. Ahora tienes las herramientas necesarias para construir APIs RESTful eficientes y escalables utilizando Nest.js.