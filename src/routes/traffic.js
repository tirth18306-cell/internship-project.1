const express = require('express');
const router = express.Router();

// Mock data for traffic analytics
const mockTrafficData = {
  totalPageViews: 15243,
  uniqueVisitors: 8392,
  bounceRate: 32.5,
  avgSessionDuration: '3m 45s',
  returningVisitors: 45,
  newVisitors: 55
};

const mockTopPages = [
  { page: '/home', views: 4521, bounceRate: 28.3 },
  { page: '/products', views: 3892, bounceRate: 35.1 },
  { page: '/about', views: 2104, bounceRate: 25.6 },
  { page: '/blog', views: 1876, bounceRate: 42.3 },
  { page: '/contact', views: 850, bounceRate: 18.9 }
];

const mockTrafficSources = [
  { source: 'Direct', traffic: 4521, percentage: 29.7 },
  { source: 'Organic Search', traffic: 5234, percentage: 34.3 },
  { source: 'Social Media', traffic: 3456, percentage: 22.7 },
  { source: 'Referral', traffic: 2032, percentage: 13.3 }
];

// GET - Overall traffic statistics
router.get('/', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: mockTrafficData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET - Top performing pages
router.get('/top-pages', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: mockTopPages,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET - Traffic sources breakdown
router.get('/sources', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: mockTrafficSources,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET - Device distribution
router.get('/devices', (req, res) => {
  try {
    const deviceData = [
      { device: 'Desktop', traffic: 9145, percentage: 60.0 },
      { device: 'Mobile', traffic: 5232, percentage: 34.3 },
      { device: 'Tablet', traffic: 866, percentage: 5.7 }
    ];
    res.status(200).json({
      success: true,
      data: deviceData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET - Geographic distribution
router.get('/geography', (req, res) => {
  try {
    const geoData = [
      { country: 'United States', traffic: 6234, percentage: 40.9 },
      { country: 'India', traffic: 3456, percentage: 22.7 },
      { country: 'United Kingdom', traffic: 2103, percentage: 13.8 },
      { country: 'Canada', traffic: 1876, percentage: 12.3 },
      { country: 'Other', traffic: 1574, percentage: 10.3 }
    ];
    res.status(200).json({
      success: true,
      data: geoData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
