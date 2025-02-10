# First Stage: Build the application
FROM maven:3.9.9-eclipse-temurin-17-alpine AS builder
WORKDIR /usr/src/app

# Copy pom.xml first to cache dependencies (optimized)
COPY pom.xml .
RUN mvn dependency:resolve  # Better caching than dependency:go-offline

# Copy source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Second Stage: Production-ready container
FROM openjdk:17-jdk-alpine
WORKDIR /usr/src/app

# Copy built JAR file from builder stage
COPY --from=builder /usr/src/app/target/*.jar app.jar

# Copy wait-for-it.sh script and give execution permission
# COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
# RUN chmod +x /usr/src/app/wait-for-it.sh

# No need to expose port here (it's done in docker-compose.yml)
EXPOSE 8000

CMD ["java", "-jar", "app.jar"]


# -----------------------------------------------------------

# REPOSITORY                                 TAG                  IMAGE ID       CREATED              SIZE
# multi-stage-build-bankapp                  latest               c512695d4f80   About a minute ago   382MB    
