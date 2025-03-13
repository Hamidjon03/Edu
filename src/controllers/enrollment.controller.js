const EnrollmentService = require('../services/enrollment.service');
const sendResponse = require('../utils/responseHandler');

class EnrollmentController {
  static async getAllEnrollments(req, res, next) {
    try {
      const enrollments = await EnrollmentService.getAllEnrollments();
      return sendResponse(res, 200, 'success', 'Enrollments retrieved successfully', enrollments);
    } catch (err) {
      next(err);
    }
  }

  static async getEnrollmentById(req, res, next) {
    try {
      const enrollment = await EnrollmentService.getEnrollmentById(req.params.id);
      if (!enrollment) {
        return sendResponse(res, 404, 'error', 'Enrollment not found');
      }
      return sendResponse(res, 200, 'success', 'Enrollment retrieved successfully', enrollment);
    } catch (err) {
      next(err);
    }
  }

  static async createEnrollment(req, res, next) {
    try {
      const newEnrollment = await EnrollmentService.createEnrollment(req.body);
      return sendResponse(res, 201, 'success', 'Enrollment created successfully', newEnrollment);
    } catch (err) {
      next(err);
    }
  }

  static async updateEnrollment(req, res, next) {
    try {
      const updatedEnrollment = await EnrollmentService.updateEnrollment(req.params.id, req.body);
      if (!updatedEnrollment) {
        return sendResponse(res, 404, 'error', 'Enrollment not found');
      }
      return sendResponse(res, 200, 'success', 'Enrollment updated successfully', updatedEnrollment);
    } catch (err) {
      next(err);
    }
  }

  static async deleteEnrollment(req, res, next) {
    try {
      const deleted = await EnrollmentService.deleteEnrollment(req.params.id);
      if (!deleted) {
        return sendResponse(res, 404, 'error', 'Enrollment not found');
      }
      return sendResponse(res, 200, 'success', 'Enrollment deleted successfully');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EnrollmentController;
