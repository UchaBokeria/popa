# Deploying to Koyeb

This guide explains how to deploy this Bun.js application to Koyeb.

## Prerequisites

- A Koyeb account
- Git repository with your code

## Deployment Steps

### Option 1: Using Koyeb Web Interface

1. Log in to your Koyeb account and go to the dashboard
2. Click "Create App"
3. Select "GitHub" as the deployment method
4. Choose your repository and branch
5. Set the following:
   - Name: `popa`
   - Type: `Web Service`
   - Build Method: `Docker`
   - Port: `3000`
   - Docker command: (leave empty to use CMD from Dockerfile)

6. Add all required environment variables:
   - `NODE_ENV` = `production`
   - `HOST` = `0.0.0.0`
   - `PORT` = `3000`
   - `DB_HOST` = (your database host)
   - `DB_PORT` = (your database port)
   - `DB_USERNAME` = (your database username)
   - `DB_PASSWORD` = (your database password)
   - `DB_DATABASE` = (your database name)
   - `JWT_SECRET` = (your JWT secret)
   - `JWT_EXPIRATION` = (your JWT expiration time)

7. Click "Create App"

### Option 2: Using Koyeb CLI

1. Install the Koyeb CLI:
   ```
   curl -fsSL https://cli.koyeb.com/install.sh | sh
   ```

2. Log in to your Koyeb account:
   ```
   koyeb login
   ```

3. Deploy the application:
   ```
   koyeb app create popa \
     --docker github.com/yourusername/popa \
     --docker-private=false \
     --ports 3000:http \
     --routes /:3000 \
     --env NODE_ENV=production \
     --env HOST=0.0.0.0 \
     --env PORT=3000 \
     --env DB_HOST=your-db-host \
     --env DB_PORT=your-db-port \
     --env DB_USERNAME=your-db-username \
     --env DB_PASSWORD=your-db-password \
     --env DB_DATABASE=your-db-name \
     --env JWT_SECRET=your-jwt-secret \
     --env JWT_EXPIRATION=your-jwt-expiration
   ```

## Troubleshooting

If you encounter build issues:

1. Make sure the repository includes these files:
   - `Dockerfile`
   - `buildpack.yml`
   - `project.toml`

2. If you're still having issues, try deploying using the Docker Registry method:
   - Build your image locally
   - Push it to Docker Hub or another registry
   - Deploy using that image URL

3. Check Koyeb logs for detailed error information. 