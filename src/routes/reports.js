const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory storage for reports
const reports = new Map();

const reportTemplates = [
  { id: 'traffic-summary', name: 'Traffic Summary', description: 'Overall traffic statistics' },
  { id: 'engagement-analysis', name: 'Engagement Analysis', description: 'User engagement metrics' },
  { id: 'user-demographics', name: 'User Demographics', description: 'Demographic breakdown' },
  { id: 'conversion-funnel', name: 'Conversion Funnel', description: 'Conversion tracking' },
  { id: 'custom', name: 'Custom Report', description: 'Create custom report' }
];

// POST - Generate custom report
router.post('/generate', (req, res) => {
  try {
    const { template, dateRange, metrics } = req.body;
    
    if (!template) {
      return res.status(400).json({ success: false, error: 'Template is required' });
    }

    const reportId = uuidv4();
    const newReport = {
      id: reportId,
      template,
      dateRange: dateRange || { start: '2026-05-01', end: '2026-05-18' },
      metrics: metrics || [],
      createdAt: new Date().toISOString(),
      status: 'completed',
      downloadUrl: `/api/reports/${reportId}/download`
    };

    reports.set(reportId, newReport);

    res.status(201).json({
      success: true,
      data: newReport,
      message: 'Report generated successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET - Available templates
router.get('/templates', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: reportTemplates,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET - Retrieve generated report
router.get('/:id', (req, res) => {
  try {
    const report = reports.get(req.params.id);
    
    if (!report) {
      return res.status(404).json({ success: false, error: 'Report not found' });
    }

    res.status(200).json({
      success: true,
      data: report,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE - Delete report
router.delete('/:id', (req, res) => {
  try {
    const report = reports.get(req.params.id);
    
    if (!report) {
      return res.status(404).json({ success: false, error: 'Report not found' });
    }

    reports.delete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Report deleted successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
