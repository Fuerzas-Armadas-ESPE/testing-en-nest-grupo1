# Tutorial: Implementación de Autenticación en un Blog Personal con Nest.js

En este tutorial, aprenderás a implementar autenticación en un blog personal utilizando Nest.js. La autenticación se realizará mediante un token JWT (JSON Web Token) que permitirá acceder a las funcionalidades CRUD del blog de manera segura.

## Paso 1: Instalación de NestJS CLI

Primero, necesitaremos instalar la CLI de NestJS globalmente. Puedes hacerlo ejecutando el siguiente comando en tu terminal:

```bash
npm install -g @nestjs/cli
```

## Paso 2: Creación del Proyecto

Crea un nuevo proyecto de NestJS llamado blog-personal-nest ejecutando el siguiente comando:

```bash
nest new blog-personal-nest
```

## Paso 3: Definición del Modelo de Usuario

Crea un archivo llamado user.model.ts en el directorio src/auth y agrega el siguiente código:

```ts
// src/auth/user.model.ts

export interface User {
  username: string;
  password: string;
}
```

## Paso 4: Creación del Controlador de Autenticación

Crea un archivo llamado auth.controller.ts en el directorio src/auth y agrega el siguiente código:

``` ts
// auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
```
## Paso 5: Implementación del Servicio de Autenticación

Crea un archivo llamado auth.service.ts en el directorio src/auth y agrega el siguiente código:

``` ts
// auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    // Verificar las credenciales del usuario
    const isValidCredentials = await this.validateCredentials(
      username,
      password,
    );
    if (!isValidCredentials) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar y devolver un token JWT
    const payload = { username };
    const accessToken = this.jwtService.sign(payload);

    return { access_token: accessToken };
  }

  async validateCredentials(
    username: string,
    password: string,
  ): Promise<boolean> {
    // Lógica para verificar las credenciales del usuario
    // Esto puede implicar consultar una base de datos o un servicio externo
    // Devuelve true si las credenciales son válidas, de lo contrario false
    return true; // Replace with your logic to validate the credentials
  }
}
```

## Paso 6: Creación del DTO para el Login

Crea un archivo llamado login.dto.ts en el directorio src/auth/dto y agrega el siguiente código:

``` ts
// login.dto.ts

export class LoginDto {
  username: string;
  readonly password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

```

## Paso 7: Configuración del Módulo de Autenticación

Modifica el archivo auth.module.ts en el directorio src/auth y agrega el siguiente código:

``` ts
// auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // Importa JwtModule
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY',
      signOptions: { expiresIn: '1h' }, // Define la expiración del token
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

```

## Paso 8: Modificación del Módulo Principal

Abre el archivo app.module.ts en el directorio src y modifícalo para importar el módulo de autenticación:

``` ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module'; // Importa el módulo de posts

@Module({
  imports: [AuthModule, PostsModule], // Importa tanto el módulo de autenticación como el módulo de posts
})
export class AppModule {}

```

## Paso 9: Ejecutar la Aplicación

Ejecuta la aplicación con el siguiente comando en tu terminal:

``` bash
cd blog-personal-nest
npm run start:dev
```
Esto iniciará el servidor de desarrollo de NestJS y automáticamente reiniciará cuando se realicen cambios en el código.

## Paso 10: Probar la Autenticación

Utiliza una herramienta como Postman o Insomnia para enviar una solicitud POST a [http://localhost:3000/auth/login](http://localhost:3000/auth/login) con el siguiente cuerpo JSON:

``` json
{
  "username": "tu_usuario",
  "password": "tu_contraseña"
}
```
Deberías recibir un token JWT como respuesta si las credenciales son válidas.

Si esto funciona correctamente, ¡has implementado la autenticación en tu blog personal utilizando NestJS!

Ahora es momento de probarlo realizando las peticiones mediante Postman o Insomnia, en este caso utilizare Thunder Client, una extensión de Visual Studio Code.

![alt text](image.png)

En la sección de Autenticación, selecciona Bearer Token y pega el token que recibiste al hacer la petición de login.

![alt text](image-1.png)

Ejemplo de autorización con el token JWT:

``` token
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW8iLCJpYXQiOjE3MDgzMjQ4NjMsImV4cCI6MTcwODMyODQ2M30.D6qsABp9OWrbiBCGqUBUmGjtzuVfmNwJi4B9JXlDemM
```

¡Y eso es todo! Has implementado la autenticación en tu blog personal utilizando NestJS. Puedes seguir añadiendo funcionalidades como la creación, actualización y eliminación de publicaciones según tus necesidades.

Recuerda que este tutorial es solo una guía básica y que debes implementar medidas de seguridad adicionales y seguir las mejores prácticas de autenticación y autorización en tu aplicación.

¡Espero que te haya sido útil! Si tienes alguna pregunta, no dudes en preguntar.