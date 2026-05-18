// API Test Suite
// Note: Run with: npm test

const request = require('supertest');
const app = require('../src/index.js');

describe('API Endpoints', () => {
  // Health Check
  describe('Health Check', () => {
    it('should return OK status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  // Traffic Routes
  describe('Traffic Routes', () => {
    it('should get traffic statistics', async () => {
      const response = await request(app)
        .get('/api/traffic')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('totalPageViews');
      expect(response.body.data).toHaveProperty('uniqueVisitors');
    });

    it('should get top pages', async () => {
      const response = await request(app)
        .get('/api/traffic/top-pages')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get traffic sources', async () => {
      const response = await request(app)
        .get('/api/traffic/sources')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get device distribution', async () => {
      const response = await request(app)
        .get('/api/traffic/devices')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toContainEqual(
        expect.objectContaining({ device: expect.any(String) })
      );
    });

    it('should get geographic distribution', async () => {
      const response = await request(app)
        .get('/api/traffic/geography')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  // Engagement Routes
  describe('Engagement Routes', () => {
    it('should get engagement metrics', async () => {
      const response = await request(app)
        .get('/api/engagement')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('clicks');
      expect(response.body.data).toHaveProperty('conversionRate');
    });

    it('should get engagement trends', async () => {
      const response = await request(app)
        .get('/api/engagement/trend')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get conversion data', async () => {
      const response = await request(app)
        .get('/api/engagement/conversions')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get session information', async () => {
      const response = await request(app)
        .get('/api/engagement/sessions')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('activeSessions');
    });
  });

  // User Routes
  describe('User Routes', () => {
    it('should get user statistics', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('totalUsers');
      expect(response.body.data).toHaveProperty('newUsers');
    });

    it('should get user demographics', async () => {
      const response = await request(app)
        .get('/api/users/demographics')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get geographic distribution', async () => {
      const response = await request(app)
        .get('/api/users/geography')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get retention metrics', async () => {
      const response = await request(app)
        .get('/api/users/retention')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  // Report Routes
  describe('Report Routes', () => {
    it('should get available templates', async () => {
      const response = await request(app)
        .get('/api/reports/templates')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should generate a new report', async () => {
      const response = await request(app)
        .post('/api/reports/generate')
        .send({
          template: 'traffic-summary',
          dateRange: { start: '2026-05-01', end: '2026-05-18' },
          metrics: ['pageViews', 'uniqueVisitors']
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('template', 'traffic-summary');
      expect(response.body.data).toHaveProperty('status', 'completed');
    });

    it('should fail to generate report without template', async () => {
      const response = await request(app)
        .post('/api/reports/generate')
        .send({
          dateRange: { start: '2026-05-01', end: '2026-05-18' }
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Template');
    });
  });

  // 404 Handler
  describe('404 Handler', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/api/unknown')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });
});
