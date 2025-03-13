// src/routes/analyticsRoutes.js
const express = require('express');
const AnalyticsController = require('../controllers/analytics.controller');
const router = express.Router();

router.get('/popular-courses', AnalyticsController.getPopularCourses);
router.get('/assimilation-rates', AnalyticsController.getAssimilationRates);

module.exports = router;
