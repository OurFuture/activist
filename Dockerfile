FROM node:6-onbuild

WORKDIR /usr/src/app
EXPOSE 3000

CMD [ "npm", "start" ]

COPY . /usr/src/app
RUN touch /usr/src/app/.env
RUN npm install
