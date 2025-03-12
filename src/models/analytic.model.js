// Analytics model: Provides methods to interact with analytics queries
const db = require('../config/db');

class Analytics {
  // Retrieve popular courses based on enrollment count
  static async getPopularCourses() {
    const result = await db.query(`
      SELECT course_id, COUNT(*) AS enrollment_count
      FROM enrollments
      GROUP BY course_id
      ORDER BY enrollment_count DESC
      LIMIT 5
    `);
    return result.rows;
  }

  // Retrieve assimilation rates (e.g., course completion percentage)
  static async getAssimilationRates() {
    const result = await db.query(`
      SELECT course_id,
        ROUND((SUM(CASE WHEN completed THEN 1 ELSE 0 END)::decimal / COUNT(*)) * 100, 2) AS assimilation_rate
      FROM enrollments
      GROUP BY course_id
    `);
    return result.rows;
  }
}

module.exports = Analytics;
