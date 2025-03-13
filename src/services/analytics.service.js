// src/services/analyticsService.js

const { sequelize } = require('../models/index');

class AnalyticsService {
  static async getPopularCourses() {
    const [results] = await sequelize.query(`
      SELECT "courseId", COUNT(*) AS "enrollmentCount"
      FROM "Enrollments"
      GROUP BY "courseId"
      ORDER BY "enrollmentCount" DESC
      LIMIT 5
    `);
    return results;
  }

  static async getAssimilationRates() {
    const [results] = await sequelize.query(`
      SELECT "courseId",
        ROUND((SUM(CASE WHEN completed THEN 1 ELSE 0 END)::decimal / COUNT(*)) * 100, 2) AS "assimilationRate"
      FROM "Enrollments"
      GROUP BY "courseId"
    `);
    return results;
  }
}

module.exports = AnalyticsService;
