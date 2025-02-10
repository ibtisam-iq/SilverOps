FROM node:18-alpine

# Set environment variables
# The default "npm install" installs devDependencies, which aren’t needed in production.
# Setting NODE_ENV=production avoids unnecessary installs.
ENV NODE_ENV=production
ENV APP_HOME=/usr/src/app

# Create and set working directory
WORKDIR $APP_HOME

# Add a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy the package.json file to the working directory
COPY package.json package-lock.json ./

# Install the dependencies specified in package.json
# RUN npm ci --only=production
# npm ci is meant for clean installs, and it removes node_modules before installing.
RUN npm install --omit=dev
# or RUN npm install --only=production

# Copy the rest of the application files (excluding files in .dockerignore)
COPY . .

# Set permissions and switch to non-root user
RUN chown -R appuser:appgroup $APP_HOME
USER appuser

# Expose application port
# Expose API port to the nginx proxy server (if used)
EXPOSE 8081

# Start the application
CMD ["npm", "start"]


# -------------------------------------------------------------------
# REPOSITORY                                 TAG                  IMAGE ID       CREATED         SIZE
# single-build-demowebpage                   latest               d423da2b1cfc   13 hours ago    133MB    