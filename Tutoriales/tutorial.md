# Tutorial

## Paso 1: Instalación de NestJS CLI

Primero, necesitaremos instalar la CLI de NestJS globalmente. Puedes hacerlo ejecutando el siguiente comando en tu terminal:

``` bash
npx -p @nestjs/cli nest new blog-personal-nest
```
Esto creará un nuevo proyecto de NestJS llamado blog-personal-nest.

## Paso 2: Creación del Modelo

Crea un archivo llamado post.model.ts en el directorio src/posts y agrega el siguiente código:

```typescript
// src/posts/post.model.ts

export interface Post {
  id: string;
  title: string;
  content: string;
}
```
## Paso 3: Creación del Controlador

Crea un archivo llamado posts.controller.ts en el directorio src/posts y agrega el siguiente código:

``` typescript
// src/posts/posts.controller.ts

import { Controller, Get } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  @Get()
  getAllPosts() {
    return 'Get all posts';
  }
}
```

## Paso 4: Creación del Servicio

Crea un archivo llamado posts.service.ts en el directorio src/posts y agrega el siguiente código:

``` typescript
// src/posts/posts.service.ts

import { Injectable } from '@nestjs/common';
import { Post } from './post.model';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  getAllPosts() {
    return this.posts;
  }
}
```

## Paso 5: Configuración del Módulo

Modifica el archivo posts.module.ts en el directorio src/posts y agrega el siguiente código:

``` typescript
// src/posts/posts.module.ts

import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
```

## Paso 6: Importar el Módulo

Abre el archivo app.module.ts en el directorio src y modifícalo de la siguiente manera:

``` typescript
// src/app.module.ts

import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [PostsModule],
})
export class AppModule {}
```

## Paso 7: Ejecutar la Aplicación

Ejecuta la aplicación con el siguiente comando en tu terminal:

``` bash
cd blog-personal-nest
npx nest start --watch
```
Esto iniciará el servidor de desarrollo de NestJS y automáticamente reiniciará cuando se realicen cambios en el código.

## Paso 8: Probar la Aplicación

Puedes probar la aplicación accediendo a `http://localhost:3000/posts` en tu navegador o utilizando herramientas como Thunder Client para enviar solicitudes HTTP a los endpoints que hemos creado.

## ¿Cómo se integran los conceptos de este tema?

**Controladores y Servicios:** En el Paso 3 y Paso 4 del tutorial, se crean el controlador y el servicio respectivamente. El controlador se encuentra en el archivo `posts.controller.ts` y el servicio en `posts.service.ts`. El controlador maneja las solicitudes HTTP y delega la lógica de negocio al servicio.

**Middleware:** Aunque el tutorial no menciona específicamente el uso de middleware, estos se podrían agregar en el archivo `app.module.ts` o en los controladores para ejecutar funciones antes o después de las solicitudes HTTP.

**Interceptores y Filtros:** Estos conceptos no se mencionan en el tutorial, pero podrían implementarse para manejar solicitudes o respuestas HTTP y para capturar y manejar excepciones respectivamente.

**Decoradores:** En el tutorial, se utilizan varios decoradores de Nest.js. Por ejemplo, en el controlador `posts.controller.ts`, se utiliza el decorador `@Controller` para definir la clase como un controlador y `@Get` para definir un método de manejo de solicitudes GET.

**Inyección de Dependencias:** En el Paso 5 del tutorial, se muestra cómo Nest.js utiliza la inyección de dependencias para proporcionar el servicio `PostsService` al controlador `PostsController` a través del módulo `PostsModule` en el archivo `posts.module.ts`.

¡Y eso es todo! Ahora tienes un proyecto básico de blog personal desarrollado con NestJS. Puedes seguir añadiendo funcionalidades como la creación, actualización y eliminación de publicaciones según tus necesidades.

