FROM node:16.14

WORKDIR /api

COPY package*.json ./

RUN ["npm", "i"] 

COPY . ./

CMD ["npm", "start"]
