const express = require('express');
const router = express.Router();

// Mock data for user analytics
const mockUserStats = {
  totalUsers: 15243,
  newUsers: 2134,
  returningUsers: 13109,
  activeUsers: 3421,
  churnRate: 2.3
};

const mockDemographics = [
  { ageGroup: '18-24', percentage: 22.5, users: 3432 },
  { ageGroup: '25-34', percentage: 35.2, users: 5368 },
  { ageGroup: '35-44', percentage: 24.1, users: 3673 },
  { ageGroup: '45-54', percentage: 12.3, users: 1877 },
  { ageGroup: '55+', percentage: 5.9, users: 899 }
];

// GET - User statistics
router.get('/', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: mockUserStats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET - Demographics information
router.get('/demographics', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: mockDemographics,
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
      { country: 'United States', users: 6234, percentage: 40.9 },
      { country: 'India', users: 3456, percentage: 22.7 },
      { country: 'United Kingdom', users: 2103, percentage: 13.8 },
      { country: 'Canada', users: 1876, percentage: 12.3 },
      { country: 'Australia', users: 1574, percentage: 10.3 }
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

// GET - Retention metrics
router.get('/retention', (req, res) => {
  try {
    const retentionData = [
      { day: 'Day 1', retention: 100 },
      { day: 'Day 7', retention: 42.5 },
      { day: 'Day 14', retention: 28.3 },
      { day: 'Day 30', retention: 18.7 },
      { day: 'Day 60', retention: 12.4 },
      { day: 'Day 90', retention: 8.9 }
    ];
    res.status(200).json({
      success: true,
      data: retentionData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
