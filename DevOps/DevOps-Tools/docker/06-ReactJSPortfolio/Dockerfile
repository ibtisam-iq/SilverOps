# Use official Node.js image
FROM node:18-alpine

# Set environment variables
ENV NODE_ENV=production
ENV APP_HOME=/app

# Set working directory
WORKDIR $APP_HOME

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy the rest of the project
COPY . .

# Build the React app for production
RUN npm run build

# Install Nginx to serve the app
# RUN apt update && apt install -y nginx is invalid in Alpine-based images because Alpine uses apk
RUN apk add --no-cache nginx

# Remove the default Nginx files (optional)
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy the build output to the Nginx directory
# RUN cp -r /app/build/* /var/www/html/ 
# RUN cp -r /app/build/* /usr/share/nginx/html/ is invalid in Alpine-based images because Alpine uses /var/www/html
RUN mkdir -p /usr/share/nginx/html && cp -r /app/build/* /usr/share/nginx/html/

# Custom Nginx configuration (fixes React routing issues)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Alpine expects it in http.d/ directory
COPY nginx.conf /etc/nginx/http.d/default.conf  

# COPY nginx.conf /etc/nginx/nginx.conf (main config file)


# Set permissions and switch to non-root user
RUN chown -R nginx:nginx /usr/share/nginx/html

# Expose port 80
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

# -----------------------------------------------------------------------------
#  REPOSITORY                                 TAG                  IMAGE ID       CREATED          SIZE
#  react-portfolio-single-build               latest               dd696796092d   14 minutes ago   591MB
   