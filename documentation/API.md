# Web Traffic & User Engagement Dashboard - API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

Currently, the API does not require authentication. Authentication will be added in future versions.

## Response Format

All API responses follow a consistent JSON format:

```json
{
  "success": true,
  "data": {},
  "timestamp": "2026-05-18T10:30:00Z",
  "error": null
}
```

## Endpoints

### Traffic Analytics

#### Get Overall Traffic Statistics

```
GET /traffic
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalPageViews": 15243,
    "uniqueVisitors": 8392,
    "bounceRate": 32.5,
    "avgSessionDuration": "3m 45s",
    "returningVisitors": 45,
    "newVisitors": 55
  }
}
```

#### Get Top Performing Pages

```
GET /traffic/top-pages
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "page": "/home",
      "views": 4521,
      "bounceRate": 28.3
    }
  ]
}
```

#### Get Traffic Sources

```
GET /traffic/sources
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "source": "Direct",
      "traffic": 4521,
      "percentage": 29.7
    }
  ]
}
```

#### Get Device Distribution

```
GET /traffic/devices
```

#### Get Geographic Distribution

```
GET /traffic/geography
```

### Engagement Metrics

#### Get Overall Engagement Metrics

```
GET /engagement
```

**Response:**
```json
{
  "success": true,
  "data": {
    "clicks": 45234,
    "interactions": 28954,
    "scrollDepth": 68.5,
    "timeOnPage": "2m 34s",
    "conversionRate": 3.2,
    "ctr": 4.8
  }
}
```

#### Get Engagement Trends

```
GET /engagement/trend
```

#### Get Conversion Data

```
GET /engagement/conversions
```

#### Get Session Information

```
GET /engagement/sessions
```

### User Analytics

#### Get User Statistics

```
GET /users
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 15243,
    "newUsers": 2134,
    "returningUsers": 13109,
    "activeUsers": 3421,
    "churnRate": 2.3
  }
}
```

#### Get User Demographics

```
GET /users/demographics
```

#### Get Geographic Distribution

```
GET /users/geography
```

#### Get Retention Metrics

```
GET /users/retention
```

### Reports

#### Generate Custom Report

```
POST /reports/generate
```

**Request Body:**
```json
{
  "template": "traffic-summary",
  "dateRange": {
    "start": "2026-05-01",
    "end": "2026-05-18"
  },
  "metrics": ["pageViews", "uniqueVisitors", "bounceRate"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "template": "traffic-summary",
    "createdAt": "2026-05-18T10:30:00Z",
    "status": "completed",
    "downloadUrl": "/api/reports/uuid/download"
  }
}
```

#### Get Available Templates

```
GET /reports/templates
```

#### Get Generated Report

```
GET /reports/:id
```

#### Delete Report

```
DELETE /reports/:id
```

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "error": "Template is required"
}
```

### 404 Not Found

```json
{
  "success": false,
  "error": "Report not found"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "error": "Internal Server Error"
}
```

## Rate Limiting

Rate limiting will be implemented in future versions.

## Versioning

Current API version: v1
