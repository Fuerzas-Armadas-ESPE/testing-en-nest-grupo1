# Conección a Base de Datos MongoDB con Mongoose

## Paso 1: Instalación de dependencias

Primero, asegúrate de tener instaladas las dependencias necesarias. Ejecuta el siguiente comando en tu terminal para instalar NestJS, Mongoose y otras dependencias necesarias:

```bash
npm install --save @nestjs/common @nestjs/core @nestjs/mongoose mongoose
```
## Paso 2: Configuración de la conexión a la base de datos

Abre el archivo app.module.ts en la raíz de tu proyecto y agrega la configuración para la conexión a la base de datos MongoDB utilizando Mongoose.

``` ts
// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestLogSchema } from './modules/request-log/request-log.shema';
import { RequestLogService } from './modules/request-log/request-log.service';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@localhost:27017'), 
    MongooseModule.forFeature([
      { name: 'RequestLog', schema: RequestLogSchema },
    ]),
    PostsModule,
  ],
  providers: [RequestLogService],
})
export class AppModule {}
```
Asegúrate de ajustar la URL de conexión según la configuración de tu entorno.

## Paso 3: Creación del esquema

Crea un esquema para la colección en tu base de datos MongoDB. Por ejemplo, en el archivo request-log.schema.ts define el esquema de la colección RequestLog.

``` ts
// request-log.schema.ts
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
```
## Paso 4: Ejecución del proyecto

¡Listo! Ahora puedes ejecutar tu proyecto NestJS y debería establecer una conexión exitosa con tu base de datos MongoDB.

``` bash
npm run start:dev
```
Conclusión

En este tutorial, configuramos la conexión a una base de datos MongoDB en un proyecto NestJS utilizando Mongoose. Creamos un esquema para una colección en la base de datos y lo registramos en el módulo principal de la aplicación. Esto proporciona una base sólida para interactuar con la base de datos MongoDB en tu aplicación NestJS. Asegúrate de ajustar la configuración según tus necesidades específicas.