# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy all files
COPY . .

# Build the React app for production
RUN npm run build

# Install Nginx to serve the app
RUN apt-get update && apt-get install -y nginx

# Copy the build output to the Nginx directory
RUN cp -r /app/build/* /var/www/html/

# Expose port 80
EXPOSE 80

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]

