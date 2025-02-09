#!/bin/sh
set -e

# Find the JAR file in the target directory
JAR_FILE=$(ls target/*.jar | head -n 1)

# Print the JAR file name
echo "Starting application with JAR: $JAR_FILE"

# Execute the application
exec java -jar "$JAR_FILE"

echo "love you my sweetheart, Ibtisam"
