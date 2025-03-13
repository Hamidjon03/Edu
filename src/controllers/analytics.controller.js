const AnalyticsService = require('../services/analytics.service');
const sendResponse = require('../utils/responseHandler');

class AnalyticsController {
  // Get popular courses analytics
  static async getPopularCourses(req, res, next) {
    try {
      const popularCourses = await AnalyticsService.getPopularCourses();
      return sendResponse(res, 200, 'success', 'Popular courses retrieved successfully', popularCourses);
    } catch (err) {
      next(err);
    }
  }

  // Get assimilation rates analytics
  static async getAssimilationRates(req, res, next) {
    try {
      const assimilationRates = await AnalyticsService.getAssimilationRates();
      return sendResponse(res, 200, 'success', 'Assimilation rates retrieved successfully', assimilationRates);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AnalyticsController;
