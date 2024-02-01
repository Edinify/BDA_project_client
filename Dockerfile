FROM node:18-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm --force install || npm start

COPY . .


EXPOSE 3000

CMD ["npm", "start"]