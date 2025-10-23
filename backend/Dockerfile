FROM node:18-alpine

# Instalar dependências necessárias para o Prisma
RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copiar schema do Prisma
COPY prisma ./prisma/
RUN npx prisma generate

# Copiar resto do código
COPY . .

EXPOSE 3001

CMD ["npm", "run", "start"]
