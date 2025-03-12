const db = require("../config/db");
const Course = require("../models/course.model");

exports.getAllCourses = async () => {
  return await Course.findAll();
};

exports.getCourseById = async (id) => {
  return await Course.findById(id);
};

exports.createCourse = async (courseData) => {
  return await Course.create(courseData);
};

exports.updateCourse = async (id, courseData) => {
  return await Course.update(id, courseData);
};

exports.deleteCourse = async (id) => {
  await Course.delete(id);
};