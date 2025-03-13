const AnalyticsService = require('../services/analytics.service');

class AnalyticsController {
  // GET /api/analytics/popular-courses
  static async getPopularCourses(req, res, next) {
    try {
      console.log("working in controller")
      const popularCourses = await AnalyticsService.getPopularCourses();
      res.status(200).json({
        status: 'success',
        message: 'Popular courses retrieved successfully',
        data: popularCourses,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/analytics/assimilation-rates
  static async getAssimilationRates(req, res, next) {
    try {
      const assimilationRates = await AnalyticsService.getAssimilationRates();
      res.status(200).json({
        status: 'success',
        message: 'Assimilation rates retrieved successfully',
        data: assimilationRates,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AnalyticsController;
