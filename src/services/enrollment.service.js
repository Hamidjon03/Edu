// src/services/enrollmentService.js
const Enrollment = require('../models/enrollment.model');
const User = require('../models/user.model');
const Course = require('../models/course.model');

class EnrollmentService {
  static async getAllEnrollments() {
    return await Enrollment.findAll({
      include: ['User', 'Course']
    });
  }

  static async getEnrollmentById(id) {
    const enrollment = await Enrollment.findByPk(id, {
      include: ['User', 'Course']
    });
    if (!enrollment) {
      throw new Error('Enrollment not found.');
    }
    return enrollment;
  }

  static async createEnrollment(data) {
    const { userId, courseId } = data;

    // Check if userId exists
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Invalid userId: User does not exist.');
    }

    // Check if courseId exists
    const course = await Course.findByPk(courseId);
    if (!course) {
      throw new Error('Invalid courseId: Course does not exist.');
    }

    // Check if enrollment already exists
    const existingEnrollment = await Enrollment.findOne({
      where: { userId, courseId }
    });
    if (existingEnrollment) {
      throw new Error('Enrollment already exists for this user and course.');
    }

    // Create new enrollment
    return await Enrollment.create(data);
  }

  static async updateEnrollment(id, data) {
    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) {
      throw new Error('Enrollment not found.');
    }

    // Allow only 'completed' field to be updated
    const { completed } = data;
    if (typeof completed !== 'boolean') {
      throw new Error('Invalid value for completed. It must be a boolean.');
    }

    enrollment.completed = completed;
    return await enrollment.save();
  }

  static async deleteEnrollment(id) {
    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) {
      throw new Error('Enrollment not found.');
    }

    await enrollment.destroy();
    return { message: 'Enrollment successfully deleted.' };
  }
}

module.exports = EnrollmentService;
