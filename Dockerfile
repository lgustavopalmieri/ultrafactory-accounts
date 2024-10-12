FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4343

# COPY start.sh ./
# RUN chmod +x start.sh

# CMD ["sh", "./start.sh"]

# CMD ["sh", "-c", "npm run dev && npm run migrate"]

CMD ["npm", "run", "dev"]
