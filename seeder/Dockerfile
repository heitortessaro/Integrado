FROM node:16.14

WORKDIR /seeder

COPY package*.json ./

RUN ["npm", "i"] 

COPY . ./

CMD ["npm", "start"]