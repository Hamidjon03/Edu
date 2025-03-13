const CourseService = require('../services/course.service');
const sendResponse = require('../utils/responseHandler');

class CourseController {
  // Get all courses
  static async getAllCourses(req, res, next) {
    try {
      const courses = await CourseService.getAllCourses();
      return sendResponse(res, 200, 'success', 'Courses retrieved successfully', courses);
    } catch (err) {
      next(err);
    }
  }

  // Get a single course by ID
  static async getCourseById(req, res, next) {
    try {
      const course = await CourseService.getCourseById(req.params.id);
      if (!course) {
        return sendResponse(res, 404, 'error', 'Course not found');
      }
      return sendResponse(res, 200, 'success', 'Course retrieved successfully', course);
    } catch (err) {
      next(err);
    }
  }

  // Create a new course
  static async createCourse(req, res, next) {
    try {
      const newCourse = await CourseService.createCourse(req.body);
      return sendResponse(res, 201, 'success', 'Course created successfully', newCourse);
    } catch (err) {
      next(err);
    }
  }

  // Update an existing course by ID
  static async updateCourse(req, res, next) {
    try {
      const updatedCourse = await CourseService.updateCourse(req.params.id, req.body);
      if (!updatedCourse) {
        return sendResponse(res, 404, 'error', 'Course not found');
      }
      return sendResponse(res, 200, 'success', 'Course updated successfully', updatedCourse);
    } catch (err) {
      next(err);
    }
  }

  // Delete a course by ID
  static async deleteCourse(req, res, next) {
    try {
      const deleted = await CourseService.deleteCourse(req.params.id);
      if (!deleted) {
        return sendResponse(res, 404, 'error', 'Course not found');
      }
      return sendResponse(res, 200, 'success', 'Course deleted successfully');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CourseController;
