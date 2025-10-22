FROM python:3.12-slim

# Install dependencies for psycopg2
RUN apt-get update && \
    apt-get install -y gcc libpq-dev && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements and install Python packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the project
COPY . .

# Expose the correct port
EXPOSE 8001

# Run migrations and start the Django server
CMD sh -c "python3 manage.py migrate --noinput && python3 manage.py runserver 0.0.0.0:8001"
