FROM node:20.19.0
LABEL authors="stas.skalkovich@gmail.com"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g @nestjs/cli

CMD ["npm", "run", "dev"]