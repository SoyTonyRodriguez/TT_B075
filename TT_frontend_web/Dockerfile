FROM node:20-alpine

WORKDIR /app

# 1. Copiar package.json y package-lock.json
COPY package.json package-lock.json ./

# 2. Instalar dependencias
RUN npm install

# 3. Copiar el resto del código
COPY . .

# 4. Exponer el puerto 5173
EXPOSE 5173

# 5. Comando para iniciar el servidor de desarrollo
CMD ["npm","run","dev", "--","--host"]