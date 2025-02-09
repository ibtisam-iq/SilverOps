# Use a lightweight OpenJDK image
FROM openjdk:8-jdk-slim

# Set the application directory
ENV APP_HOME=/usr/src/app
WORKDIR $APP_HOME

# Expose the application port
EXPOSE 3395
RUN apt update && apt install -y maven && mvn package -DskipTests || { echo 'Maven build failed'; exit 1; }

# Add a debug step before the COPY command
RUN ls -la /usr/src/app/target && sleep 120  # 2 minutes

# Copy the built JAR file from the target directory
# COPY target/*.jar app.jar

# Run the Java application
#CMD ["java", "-jar", "app.jar"]

CMD ["sh", "-c", "java -jar $(ls /usr/src/app/target/*.jar | head -n 1)"]