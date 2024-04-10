FROM node:14

WORKDIR /todoapp

COPY package.json package-lock.json /todoapp/

RUN npm install

COPY . /todoapp

EXPOSE 3000

VOLUME [ "/data" ]

CMD [ "node", "app.js" ]
