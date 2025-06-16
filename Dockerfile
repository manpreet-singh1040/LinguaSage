FROM node:20-alpine

WORKDIR /app

COPY . .
RUN npm install

RUN npx prisma generate

CMD ["sh", "-c", "npx prisma migrate deploy && node index.js"]