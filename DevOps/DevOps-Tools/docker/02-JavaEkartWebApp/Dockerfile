# Use a lightweight OpenJDK image
FROM openjdk:17-jdk-slim

# Set the application directory
ENV APP_HOME=/usr/src/app
WORKDIR $APP_HOME

# Expose the application port
EXPOSE 8070

# Copy the built JAR file from the target directory
COPY target/*.jar app.jar

# Run the Java application
CMD ["java", "-jar", "app.jar"]
