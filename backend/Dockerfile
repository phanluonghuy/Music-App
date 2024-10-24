FROM node:22.7.0-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

ENV MONGO_URI=mongodb://172.19.0.2:27017/music_streaming
ENV JWT_SECRET=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyOTA5MDMwOCwiaWF0IjoxNzI5MDkwMzA4fQ.rupFvTyZwxI_oeZydy3gmxJv9SPiik9-PqjZQwze1mY

CMD ["npm", "run", "start"]