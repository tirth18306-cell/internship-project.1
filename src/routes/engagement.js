const express = require('express');
const router = express.Router();

// Mock data for engagement metrics
const mockEngagementData = {
  clicks: 45234,
  interactions: 28954,
  scrollDepth: 68.5,
  timeOnPage: '2m 34s',
  conversionRate: 3.2,
  ctr: 4.8
};

const mockEngagementTrend = [
  { date: '2026-05-14', engagementScore: 72, clicks: 3421, interactions: 2145 },
  { date: '2026-05-15', engagementScore: 75, clicks: 3654, interactions: 2356 },
  { date: '2026-05-16', engagementScore: 78, clicks: 4123, interactions: 2654 },
  { date: '2026-05-17', engagementScore: 82, clicks: 4892, clicks: 2895 },
  { date: '2026-05-18', engagementScore: 85, clicks: 5234, interactions: 3098 }
];

// GET - Overall engagement metrics
router.get('/', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: mockEngagementData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET - Engagement trends
router.get('/trend', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: mockEngagementTrend,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET - Conversion data
router.get('/conversions', (req, res) => {
  try {
    const conversionData = [
      { goal: 'Newsletter Signup', conversions: 234, conversionRate: 1.5 },
      { goal: 'Product Purchase', conversions: 89, conversionRate: 0.6 },
      { goal: 'Contact Form', conversions: 156, conversionRate: 1.0 },
      { goal: 'Download', conversions: 423, conversionRate: 2.8 }
    ];
    res.status(200).json({
      success: true,
      data: conversionData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET - Session information
router.get('/sessions', (req, res) => {
  try {
    const sessionData = {
      activeSessions: 234,
      avgSessionDuration: '3m 45s',
      sessionsPerDay: 1543,
      bounceRate: 32.5,
      returningVisitors: 45
    };
    res.status(200).json({
      success: true,
      data: sessionData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
