FROM node:latest

WORKDIR /usr/app

COPY package.json /usr/app
COPY yarn.lock /usr/app

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["yarn", "run", "dev"]