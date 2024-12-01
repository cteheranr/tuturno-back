# Usa una imagen oficial de Node.js 20
FROM node:20

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo de configuración de paquetes y realiza la instalación
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos de la aplicación al contenedor
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main.js"]
