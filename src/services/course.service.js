const { Course } = require('../models/course.model');

class CourseService {
  static async getAllCourses() {
    return await Course.findAll();
  }

  static async getCourseById(id) {
    return await Course.findByPk(id);
  }

  static async createCourse(data) {
    return await Course.create(data);
  }

  static async updateCourse(id, data) {
    const course = await Course.findByPk(id);
    if (!course) return null;
    return await course.update(data);
  }

  static async deleteCourse(id) {
    const course = await Course.findByPk(id);
    if (!course) return null;
    await course.destroy();
    return true;
  }
}

module.exports = CourseService;
