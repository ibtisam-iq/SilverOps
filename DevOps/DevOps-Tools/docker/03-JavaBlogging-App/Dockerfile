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
RUN mvn package -DskipTests

# Copy JAR file to final location
# COPY target/*.jar $APP_HOME/app.jar

# Expose the application port
EXPOSE 8080

# CMD ["java", "-jar", "$APP_HOME/app.jar"]
CMD ["sh", "-c", "java -jar $(ls /usr/src/app/target/*.jar | head -n 1)"]


# --------------------------------------------------------------------

#  REPOSITORY                          TAG                  IMAGE ID       CREATED             SIZE
#  single-build-blogapp-with-openjdk   latest               9c18bd4d3986   2 minutes ago       838MB   