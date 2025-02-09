# Stage 1: Build the React app
FROM node:18-alpine AS build

# Set environment variables
ENV NODE_ENV=production
ENV APP_HOME=/app

# Set working directory
WORKDIR $APP_HOME

# Copy package.json and package-lock.json first (improves caching)
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy all files
COPY . .

# Build the React app for production
RUN npm run build

# --------------------------------------------

# Stage 2: Serve the app with Nginx

# Use Nginx to serve the app
FROM nginx:alpine

# Set working directory to Nginx's public directory
WORKDIR /usr/share/nginx/html

# Remove the default Nginx files (optional)
# Mandatory only, if using it as reverse proxy for other services
# RUN rm -rf ./* && RUN rm -rf /etc/nginx/conf.d/default.conf && RUN rm -rf /etc/nginx/nginx.conf (wrong syntax)
# RUN rm -rf ./* /etc/nginx/conf.d/default.conf /etc/nginx/nginx.conf # (not necessary)

# Copy the built app from the build stage to Nginx's public directory where it serves static content from by default
# For a React frontend-only application served via Nginx, you do not need to copy `node_modules` from the build image.
# See webpack's output path in your React app's configuration.
# path: path.resolve(__dirname, 'public')
COPY --from=build /app/public .

# Custom Nginx configuration (fixes React routing issues)
# Nginx missing React route handling (/api/* requests should go to server).
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Fix permissions (not necessary)
# RUN chown -R nginx:nginx /usr/share/nginx/html

# Expose port 80 for the app
EXPOSE 80

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]

# --------------------------------------------
# RUN addgroup -S appgroup && adduser -S appuser -G appgroup    
# RUN chown -R appuser:appuser /usr/share/nginx/html
# USER appuser

# You switched to appuser, but Nginx runs as nginx user by default, 
# which may cause permission errors when accessing /usr/share/nginx/html/.

# Fix: Explicitly change ownership for Nginx:
# RUN chown -R nginx:nginx /usr/share/nginx/html

