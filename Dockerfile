FROM node:14-alpine

WORKDIR /peregrine-react-app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]
