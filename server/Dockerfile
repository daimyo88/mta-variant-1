# fill in the blanks to dockerize this node app
FROM node:16-alpine3.13 as base

WORKDIR /app

COPY package*.json ./


FROM base as dev

RUN npm install && npm cache clean --force
RUN npm install nodemon -g

CMD ["npm", "run", "dev"]

FROM base as prod

RUN npm ci --only=production

RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

COPY . .

CMD ["node", "server.js"]
