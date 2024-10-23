# Backend Dockerfile

# Use Node.js base image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port for the backend API
EXPOSE 1337

# Define environment variables (adjust as needed)
# ENV MONGO_URI=mongodb://mongo:27017/musicappdb
# ENV JWT_SECRET=your_jwt_secret

# ENV MONGO_URI=mongodb://host.docker.internal:27017/mydatabase
# ENV JWT_SECRET=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyOTA5MDMwOCwiaWF0IjoxNzI5MDkwMzA4fQ.rupFvTyZwxI_oeZydy3gmxJv9SPiik9-PqjZQwze1mY

# Start the backend server
CMD ["node", "server"]
