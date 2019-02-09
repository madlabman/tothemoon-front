FROM node:8-alpine as node

RUN apk add yarn && apk add git && yarn global add bower gulp

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY bower.json .bowerrc ./

RUN npm run bower

COPY . .

RUN npm run build

FROM nginx:1.15.8-alpine

COPY --from=node /usr/src/app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf