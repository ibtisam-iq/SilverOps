FROM python:3.9-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Use a non-root user for security
RUN useradd -m appuser
USER appuser

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]


