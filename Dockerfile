FROM node:20

WORKDIR /app

ENV NODE_ENV=development

COPY package*.json ./
RUN npm install --include=dev

COPY . .

CMD ["npm", "start"]
