FROM node:latest

WORKDIR /usr/src/app

RUN npm init -y

RUN npm install express --save

RUN npm install mysql --save

ENTRYPOINT ["node", "index.js"]