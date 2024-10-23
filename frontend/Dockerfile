# Frontend Dockerfile

# Use Node.js base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the app's source code
COPY . .

# RUN PROJECT

CMD ["npm", "start"]
