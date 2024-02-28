# Tutorial: Implementación de Docker y Docker Compose en un Blog Personal con Nest.js

En este tutorial, aprenderemos a implementar Docker y Docker Compose en un blog personal desarrollado con Nest.js. Docker es una herramienta que facilita la creación, implementación y ejecución de aplicaciones utilizando contenedores. Docker Compose, por otro lado, es una herramienta que nos permite definir y ejecutar aplicaciones Docker multi-contenedor.

## **Paso 1:** Preparación del Proyecto

Antes de comenzar, asegúrate de tener instalado Docker y Docker Compose en tu sistema. Puedes descargar e instalar Docker desde el sitio web oficial de Docker. Una vez instalado, asegúrate de tener un entorno de desarrollo Nest.js configurado y funcionando correctamente.

## **Paso 2:** Configuración de Dockerfile

El primer paso es crear un archivo Dockerfile en la raíz de tu proyecto. Este archivo contendrá las instrucciones necesarias para construir una imagen Docker de tu aplicación Nest.js. Aquí tienes un ejemplo de cómo podría ser un Dockerfile básico para una aplicación Nest.js:

``` Dockerfile
# Usa una imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de tu aplicación al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de tu aplicación
COPY . .

# Expone el puerto 3000
EXPOSE 3000

# Comando para ejecutar la aplicación cuando el contenedor se inicie
CMD ["npm", "start"]
```
Este archivo Dockerfile instalará las dependencias de tu aplicación, copiará el código fuente de tu proyecto y expondrá el puerto 3000 para que la aplicación Nest.js pueda ser accesible desde fuera del contenedor.

## **Paso 3:** Configuración de Docker Compose

A continuación, crearemos un archivo docker-compose.yml en la raíz de nuestro proyecto. Este archivo nos permitirá definir y ejecutar servicios Docker, en este caso, nuestra aplicación Nest.js. Aquí tienes un ejemplo de cómo podría ser un archivo docker-compose.yml básico:

``` yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
    depends_on:
      - mongodb

  mongodb:
    image: mongo
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=example
      - MONGO_INITDB_DATABASE=mydatabase
    volumes:
      - mongo-data:/data/db
      - ./init-mongo.js:/docker-entrypoint-initdb.d/init-mongo.js:ro

volumes:
  mongo-data:
    driver: local
```

Este archivo de Docker Compose define un servicio llamado app que construye la imagen de Docker utilizando el Dockerfile presente en el directorio actual (.). Además, mapea el puerto 3000 del contenedor al puerto 3000 del host y monta el directorio actual como un volumen dentro del contenedor para permitir cambios en el código fuente sin reconstruir la imagen.

## **Paso 4:** Construcción y Ejecución de Contenedores Docker

Una vez que hayas creado los archivos Dockerfile y docker-compose.yml, puedes construir y ejecutar los contenedores Docker utilizando los siguientes comandos:

``` bash
# Construye los contenedores
docker-compose build

# Inicia los contenedores
docker-compose up
```
Estos comandos construirán la imagen de Docker de tu aplicación Nest.js y luego iniciarán el contenedor. Una vez que el contenedor esté en funcionamiento, podrás acceder a tu aplicación Nest.js a través del puerto 3000 en tu navegador web.

¡Y eso es todo! Has implementado con éxito Docker y Docker Compose en tu blog personal desarrollado con Nest.js. Ahora tu aplicación es fácilmente distribuible y ejecutable en cualquier entorno compatible con Docker.