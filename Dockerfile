FROM node

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

COPY ./dist ./dist

CMD [ "yarn", "run", "start:dev" ]