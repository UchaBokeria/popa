# Docker Setup for Popa

This document explains how to run the Popa application using Docker.

## Prerequisites

- Docker and Docker Compose installed on your system
- Git (to clone the repository)

## Quick Start

1. Clone the repository (if you haven't already):
   ```
   git clone <repository-url>
   cd popa
   ```

2. Run the application using the provided script:
   ```
   ./docker-run.sh
   ```

   This will:
   - Create a `.env` file if it doesn't exist
   - Set `DB_HOST=localhost` for Docker usage
   - Build and start the application and database containers

3. Access the application at `http://localhost:3000`

## Environment Configuration

The application uses the following environment variables, which are set in the `.env` file:

- `NODE_ENV`: Application environment (development/production)
- `HOST`: Host to bind the server to
- `PORT`: Port to run the server on
- `DB_HOST`: Database host (postgres when using Docker)
- `DB_PORT`: Database port
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
- `DB_DATABASE`: Database name
- `JWT_SECRET`: Secret for JWT token generation
- `JWT_EXPIRATION`: JWT token expiration time

## Development vs Production

### Local Development with Docker Database

To run the application locally but use the Docker PostgreSQL database:

```
./docker-run.sh local
```

This sets `DB_HOST=localhost` in the `.env` file.

### Running in Production Mode

For production deployment:

```
./docker-run.sh
```

This ensures `DB_HOST=postgres` is set in the `.env` file.

## Deploying to Koyeb

1. Make sure you have the Koyeb CLI installed and configured
2. Build and push the Docker image to a registry:
   ```
   docker build -t your-registry/popa:latest .
   docker push your-registry/popa:latest
   ```
3. Deploy to Koyeb using their dashboard or CLI, specifying the environment variables as needed

## Docker Compose Commands

- Start services: `docker-compose up`
- Start services in background: `docker-compose up -d`
- Stop services: `docker-compose down`
- View logs: `docker-compose logs -f`
- Rebuild and start: `docker-compose up --build`

## Troubleshooting

- If the application can't connect to the database, check that the `DB_HOST` is set correctly
- For database connection issues, try `docker-compose down -v` to remove volumes and start fresh
- Check logs with `docker-compose logs -f app` or `docker-compose logs -f postgres` 