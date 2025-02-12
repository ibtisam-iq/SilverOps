# ===========================================
# React Frontend Deployment with Docker
# ===========================================

# There are multiple ways to deploy a React frontend in production:
# 
# 1️⃣ Serve React + API Together (Node.js)
#    - React is served by Express along with API routes (`/api/*`).
#    - Simplifies setup but is **less efficient than Nginx**.
#    - Not used in this Dockerfile.
# 
# 2️⃣ Serve React with Nginx + Reverse Proxy (Preferred)
#    - React frontend is served as static files by Nginx.
#    - Nginx **acts as a reverse proxy**, forwarding API requests to a backend service.
#    - This improves performance, security, and scalability.
# 
# ✅ This Dockerfile follows **Option 2**:
#    - **React build** is generated in a Node.js container.
#    - **Nginx serves the frontend** and proxies API requests to the backend.

# ===========================================
# Stage 1: Build the React App
# ===========================================

# Use a lightweight Node.js image to build the frontend
FROM node:18-alpine AS build

# Set environment variables
ENV NODE_ENV=production
ENV APP_HOME=/app

# Set working directory for the build process
WORKDIR $APP_HOME

# Copy only package.json and package-lock.json first (improves caching)
# Copy package.json and package-lock.json for deterministic dependency installation
COPY package.json package-lock.json ./

# Install dependencies explicitly including devDependencies (important for Babel)
RUN npm install --include=dev

# Copy all files
COPY . .

# Build the React app into static files for production (output: `/app/public`)
RUN npm run build

# ===========================================
# Stage 2: Serve the React App with Nginx
# ===========================================

# Use a lightweight Nginx Alpine image to serve the frontend
FROM nginx:alpine

# Set working directory to Nginx's default static file directory
WORKDIR /usr/share/nginx/html

# Remove the default Nginx files (optional)
# Mandatory only, if using it as reverse proxy for other services
# RUN rm -rf ./* && RUN rm -rf /etc/nginx/conf.d/default.conf (wrong syntax)
# RUN rm -rf ./* /etc/nginx/conf.d/default.conf # (not necessary)

# Copy the built app from the build stage to Nginx's public directory where it serves static content from by default
# For a React frontend-only application served via Nginx, you do not need to copy `node_modules` from the build image.
# See webpack's output path in your React app's configuration.
# path: path.resolve(__dirname, 'public')
COPY --from=build /app/public .

# Configure Nginx for:
# ✅ Serving static files (React frontend)
# ✅ Acting as a reverse proxy for API requests (`/api/` → backend)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Fix permissions (not necessary)
# RUN chown -R nginx:nginx /usr/share/nginx/html

# Expose port 80 for the app
EXPOSE 80

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]


# ===========================================

# 📝 Notes:
# In this Dockerfile, Nginx serves frontend and handles API requests. Express is completely free (only API logic) 
# ✅ Serving static files (React frontend)
# ✅ Acting as a reverse proxy for API requests (`/api/` → backend)



# --------------------------------------------
# RUN addgroup -S appgroup && adduser -S appuser -G appgroup    
# RUN chown -R appuser:appuser /usr/share/nginx/html
# USER appuser

# You switched to appuser, but Nginx runs as nginx user by default, 
# which may cause permission errors when accessing /usr/share/nginx/html/.

# Fix: Explicitly change ownership for Nginx:
# RUN chown -R nginx:nginx /usr/share/nginx/html

