const Analytics = require('../models/analytic.model');

exports.getPopularCourses = async () => {
  return await Analytics.getPopularCourses();
};

exports.getAssimilationRates = async () => {
  return await Analytics.getAssimilationRates();
};
