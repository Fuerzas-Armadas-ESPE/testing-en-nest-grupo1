# Usa la imagen oficial de Node como base
FROM node:20.10.0

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json para instalar las dependencias
COPY package.json package-lock.json ./

# Instala las dependencias utilizando npm
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto 3000 para acceder a la aplicación
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "run", "start:dev"]
