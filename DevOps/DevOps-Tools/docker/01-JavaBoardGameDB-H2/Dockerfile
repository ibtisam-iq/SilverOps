FROM openjdk:17-jdk-slim
# LegacyKeyValueFormat: "ENV key=value" should be used instead of legacy "ENV key value" format.
ENV APP_HOME=/usr/src/app 
WORKDIR $APP_HOME

# Install Maven 
# Excluded when building the image with CI/CD pipeline, as Maven is already installed in the pipeline. 
RUN apt-get update && apt-get install -y maven

# Copy source code to container for building the application
# Excluded when building the image with CI/CD pipeline, as the source code is already copied to the pipeline. 
COPY . $APP_HOME
# COPY . .

# Build the application with Maven in the container
# Excluded when building the image with CI/CD pipeline, as the application is already built in the pipeline.
RUN mvn package -DskipTests || { echo 'Maven build failed'; exit 1; }

# Add a debug step before the COPY command
RUN ls -la /usr/src/app/target && sleep 300  # 5 minutes

# Copy JAR file to final location
COPY target/*.jar $APP_HOME/app.jar

# Expose the application port
EXPOSE 8080

CMD ["java", "-jar", "$APP_HOME/app.jar"]


# Error:
# failed to solve: lstat /var/lib/docker/tmp/buildkit-mount940350498/target: no such file or director
