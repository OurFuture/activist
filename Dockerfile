FROM node:6-onbuild

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN touch /usr/src/app/.env

ONBUILD ARG NODE_ENV
ONBUILD ENV NODE_ENV $NODE_ENV

ONBUILD COPY package.json /usr/src/app/
ONBUILD RUN npm install

ONBUILD COPY . /usr/src/app

EXPOSE 3000

CMD [ "npm", "start" ]

