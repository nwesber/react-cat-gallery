# Use an official Node runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Build the React app
RUN npm run build

# Install serve to serve the app
RUN npm install -g serve

# The port the app runs on
EXPOSE 5000

# The command to run the app
CMD ["serve", "-s", "build", "-l", "5000"]
