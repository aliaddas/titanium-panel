# Use an official Node.js runtime as a base image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm install
# Copy the entire project to the working directory
ADD . .

# Run npm run dev when the container launches
CMD ["npm", "run", "dev"]