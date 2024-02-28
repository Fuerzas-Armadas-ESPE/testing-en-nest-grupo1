# Tutorial: Implementación de pruebas unitarias en NestJS

En este tutorial, aprenderemos cómo implementar pruebas unitarias y de extremo a extremo en una aplicación NestJS utilizando Jest como nuestro marco de pruebas. Utilizaremos un ejemplo de una aplicación de blog personal para ilustrar los conceptos.

1. Configuración del entorno

Antes de comenzar, asegúrate de tener Node.js y npm instalados en tu sistema. Luego, crea un nuevo proyecto NestJS ejecutando el siguiente comando:

``` bash
npx @nestjs/cli new blog-personal-nest
```
Una vez creado el proyecto, navega hasta el directorio del proyecto:

``` bash
cd blog-personal-nest
```
2. Instalación de dependencias

Instala Jest, la librería de pruebas para NestJS, y la librería @nestjs/testing para habilitar las utilidades de prueba. También, instala ts-jest para permitir que **Jest** funcione con TypeScript, y supertest para realizar pruebas de extremo a extremo:

``` bash
npm install --save-dev @types/jest
```
3. Configuración de Jest

Crea un archivo de configuración de Jest llamado jest.config.js en el directorio raíz de tu proyecto con el siguiente contenido:

``` js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```
4. Configuración de pruebas de extremo a extremo

Crea un archivo de configuración para pruebas de extremo a extremo llamado test/jest-e2e.json:

``` json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}
```
Crea un archivo de prueba de extremo a extremo llamado `test/app.e2e-spec.ts` con el siguiente contenido:

``` typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
```
5. Configuración de TypeScript

Asegúrate de tener la siguiente configuración en tu archivo tsconfig.json:

``` json
{
  "compilerOptions": {
    // Otras opciones de configuración...
    "types": ["jest","node", "mongoose"]
  }
}

6. Estructura de archivos

Organiza tu código en una estructura de archivos adecuada. Por ejemplo:

``` markdown

blog-personal-nest/
  |- src/
      |- app.controller.ts
      |- posts/
          |- posts.module.ts
          |- posts.controller.ts
          |- posts.service.ts
          |- post.model.ts
      |- ...
  |- test/
      |- jest-e2e.json
      |- app.e2e-spec.ts
```
7. Escribir pruebas unitarias y de extremo a extremo

Escribe pruebas unitarias y de extremo a extremo según sea necesario para tu aplicación. Aquí tienes algunos ejemplos:

## Ejemplo de prueba unitaria para un servicio

En el archivo **src/posts/posts.service.spec.ts**, escribe una prueba para el servicio PostsService:

``` typescript
import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getModelToken } from '@nestjs/mongoose';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getModelToken('Post'),
          useValue: {}, // Proporciona un valor falso para el modelo
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Agrega más pruebas según sea necesario para los métodos del servicio
});
```

Ejemplo de prueba de extremo a extremo para un controlador

En el archivo test/app.e2e-spec.ts, escribe una prueba de extremo a extremo para el controlador de la aplicación:

``` typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
```
8. Ejecutar las pruebas

Finalmente, ejecuta tus pruebas con el siguiente comando:

``` bash
npm test -- --config=jest.config.js
```
Esto ejecutará Jest utilizando la configuración que hemos proporcionado y mostrará los resultados de las pruebas en la consola.

¡Y eso es todo! Ahora tienes pruebas unitarias y de extremo a extremo configuradas para tu aplicación NestJS. Puedes expandir este tutorial agregando más pruebas para otros componentes de tu aplicación.
