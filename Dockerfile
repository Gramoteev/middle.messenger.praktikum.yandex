FROM node:16-alpine

WORKDIR /app

COPY . .

EXPOSE 3000

RUN npm i

CMD npm run start
