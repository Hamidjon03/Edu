const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');

// Analytics routes
router.get('/popular-courses', analyticsController.getPopularCourses);
router.get('/assimilation-rates', analyticsController.getAssimilationRates);

module.exports = router;
