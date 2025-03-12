const analyticsService = require('../services/analytics.service');

// GET /api/analytics/popular-courses - Retrieve popular courses data
exports.getPopularCourses = async (req, res, next) => {
  try {
    const popularCourses = await analyticsService.getPopularCourses();
    res.json(popularCourses);
  } catch (error) {
    next(error);
  }
};

// GET /api/analytics/assimilation-rates - Retrieve assimilation rates data
exports.getAssimilationRates = async (req, res, next) => {
  try {
    const assimilationRates = await analyticsService.getAssimilationRates();
    res.json(assimilationRates);
  } catch (error) {
    next(error);
  }
};
