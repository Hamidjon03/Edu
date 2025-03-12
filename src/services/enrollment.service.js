const Enrollment = require('../models/enrollment.model');

// Retrieve all enrollments via the model
exports.getAllEnrollments = async () => {
  return await Enrollment.findAll();
};

// Retrieve a single enrollment by its ID via the model
exports.getEnrollmentById = async (id) => {
  return await Enrollment.findById(id);
};

// Create a new enrollment record using the model
exports.createEnrollment = async (enrollmentData) => {
  return await Enrollment.create(enrollmentData);
};

// Update an existing enrollment record using the model
exports.updateEnrollment = async (id, enrollmentData) => {
  return await Enrollment.update(id, enrollmentData);
};

// Delete an enrollment record using the model
exports.deleteEnrollment = async (id) => {
  await Enrollment.delete(id);
};
