// src/services/enrollmentService.js
const Enrollment = require('../models/enrollment.model');

class EnrollmentService {
  static async getAllEnrollments() {
    return await Enrollment.findAll();
  }

  static async getEnrollmentById(id) {
    return await Enrollment.findByPk(id);
  }

  static async createEnrollment(data) {
    return await Enrollment.create(data);
  }

  static async updateEnrollment(id, data) {
    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) return null;
    return await enrollment.update(data);
  }

  static async deleteEnrollment(id) {
    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) return null;
    await enrollment.destroy();
    return true;
  }
}

module.exports = EnrollmentService;
