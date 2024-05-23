FROM node:18-alpine

WORKDIR /home/app


RUN yarn install

COPY  . .


EXPOSE 3333

CMD [ "yarn", "run" ,"dev" ]