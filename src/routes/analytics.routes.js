// src/routes/analyticsRoutes.js
const express = require('express');
const AnalyticsController = require('../controllers/analytics.controller');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Analytics endpoints for courses data
 */

/**
 * @swagger
 * /analytics/popular-courses:
 *   get:
 *     summary: Retrieve popular courses based on enrollment count
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: A list of popular courses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   courseId:
 *                     type: string
 *                   enrollmentCount:
 *                     type: integer
 */
router.get('/popular-courses', AnalyticsController.getPopularCourses);

/**
 * @swagger
 * /analytics/assimilation-rates:
 *   get:
 *     summary: Retrieve assimilation rates (course completion percentages)
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: A list of assimilation rates for courses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   courseId:
 *                     type: string
 *                   assimilationRate:
 *                     type: number
 *                     format: float
 */
router.get('/assimilation-rates', AnalyticsController.getAssimilationRates);

module.exports = router;
