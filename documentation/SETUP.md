# Web Traffic & User Engagement Dashboard - Setup Guide

## Prerequisites

- Node.js v16+ ([Download](https://nodejs.org/))
- npm v8+ or yarn v3+
- PostgreSQL v12+ ([Download](https://www.postgresql.org/))
- Git

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/tirth18306-cell/internship-project.1.git
cd internship-project.1
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### 3. Set Up Environment Variables

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=traffic_dashboard
DB_USER=postgres
DB_PASSWORD=your_secure_password

API_URL=http://localhost:5000
CORS_ORIGIN=http://localhost:3000

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

LOG_LEVEL=debug
```

### 4. Set Up PostgreSQL Database

#### Option A: Using psql Command Line

```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE traffic_dashboard;

# Connect to the new database
\c traffic_dashboard

# Load the schema
\i database/schema.sql

# Exit psql
\q
```

#### Option B: Using SQL File Directly

```bash
psql -U postgres -d traffic_dashboard -f database/schema.sql
```

### 5. Verify Database Connection

Test the database connection:
```bash
psql -U postgres -d traffic_dashboard -c "SELECT * FROM users LIMIT 1;"
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The server will start with hot-reload enabled using Nodemon. Output:
```
🚀 Server running on http://localhost:5000
📊 Dashboard available at http://localhost:5000/dashboard
🔍 API Health check: http://localhost:5000/health
```

### Production Mode

```bash
npm start
```

## Testing

### Run All Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Run Specific Test File

```bash
npm test -- api.test.js
```

## API Testing

### Using cURL

```bash
# Get traffic statistics
curl http://localhost:5000/api/traffic

# Get top pages
curl http://localhost:5000/api/traffic/top-pages

# Get engagement metrics
curl http://localhost:5000/api/engagement

# Get user statistics
curl http://localhost:5000/api/users
```

### Using Postman

1. Download and install [Postman](https://www.postman.com/)
2. Import the API collection (if available)
3. Set the base URL to `http://localhost:5000/api`
4. Test each endpoint

## Database Management

### View Database Tables

```bash
psql -U postgres -d traffic_dashboard -c "\dt"
```

### Backup Database

```bash
pg_dump -U postgres traffic_dashboard > backup.sql
```

### Restore Database

```bash
psql -U postgres -d traffic_dashboard < backup.sql
```

### Drop Database (Reset)

```bash
psql -U postgres -c "DROP DATABASE traffic_dashboard;"
```

## Troubleshooting

### Port Already in Use

If port 5000 is already in use:
```bash
# Change the port in .env
PORT=5001

# Or find and kill the process on port 5000
kill -9 $(lsof -t -i:5000)  # macOS/Linux
```

### Database Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

Solutions:
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database exists: `psql -U postgres -l`

### Module Not Found Error

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Development Best Practices

1. **Use Environment Variables**: Store sensitive data in `.env` file
2. **Follow Code Style**: Use ESLint for code consistency
3. **Write Tests**: Maintain good test coverage
4. **Document Code**: Add comments for complex logic
5. **Use Git**: Commit frequently with meaningful messages

## Next Steps

1. Set up the frontend application
2. Configure WebSocket for real-time updates
3. Implement authentication
4. Add data visualization
5. Deploy to production

## Support

For issues or questions:
- Check the [API Documentation](./API.md)
- Review error logs in console
- Open an issue on GitHub
