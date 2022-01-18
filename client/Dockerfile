FROM node:16-alpine3.12 as base

WORKDIR /app

COPY package*.json ./

###
FROM base as dev

RUN npm install && npm cache clear --force
CMD ["npm", "run", "dev"]

###
FROM base as prod

COPY . .

RUN npm ci --only=production

RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

ENV API_URL https://example.com

RUN npm run build

CMD ["npm", "start"]