// src/services/enrollmentService.js
const Enrollment = require('../models/enrollment.model');
const User = require('../models/user.model');
const Course = require('../models/course.model');

class EnrollmentService {
  static async getAllEnrollments() {
    try {
      return await Enrollment.findAll({
        include: ['User', 'Course']
      });
    } catch (error) {
      console.error('Error in getAllEnrollments:', error);
      throw error;
    }
  }

  static async getEnrollmentById(id) {
    try {
      const enrollment = await Enrollment.findByPk(id, {
        include: ['User', 'Course']
      });
      if (!enrollment) {
        throw new Error('Enrollment not found.');
      }
      return enrollment;
    } catch (error) {
      console.error(`Error in getEnrollmentById for id ${id}:`, error);
      throw error;
    }
  }

  static async createEnrollment(data) {
    try {
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
    } catch (error) {
      console.error('Error in createEnrollment:', error);
      throw error;
    }
  }

  static async updateEnrollment(id, data) {
    try {
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
    } catch (error) {
      console.error(`Error in updateEnrollment for id ${id}:`, error);
      throw error;
    }
  }

  static async deleteEnrollment(id) {
    try {
      const enrollment = await Enrollment.findByPk(id);
      if (!enrollment) {
        throw new Error('Enrollment not found.');
      }

      await enrollment.destroy();
      return { message: 'Enrollment successfully deleted.' };
    } catch (error) {
      console.error(`Error in deleteEnrollment for id ${id}:`, error);
      throw error;
    }
  }
}

module.exports = EnrollmentService;
