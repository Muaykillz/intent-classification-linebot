# Use an official Python runtime as the base image
FROM python:3.11

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code to the working directory
COPY . .

# Set the environment variable for the port
ENV PORT 8000

# Expose the port the app runs on
EXPOSE 8000

# Run the application
CMD ["python", "run.py"]