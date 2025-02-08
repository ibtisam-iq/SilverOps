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

# No need to expose port here (it's done in docker-compose.yml)

CMD ["java", "-jar", "app.jar"]
