FROM node:20.19.0
LABEL authors="stas.skalkovich@gmail.com"

WORKDIR '/app'

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

CMD ["npm","run","dev"]
