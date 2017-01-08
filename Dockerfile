FROM node:6-onbuild

WORKDIR /usr/src/app
EXPOSE 3000

COPY package.json ./
RUN npm install

COPY . /usr/src/app

RUN npm build

CMD [ "npm", "start" ]