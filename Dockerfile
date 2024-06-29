# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copy the local code to the container
COPY . .

# Build the React app
RUN npm run build

# Install serve globally to serve the static content
RUN npm install -g serve

# Set the command to run your production build
CMD ["serve", "-s", "build", "-l", "3000"]

# Expose port 3000 to the outside world
EXPOSE 3000
