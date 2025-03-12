const enrollmentService = require('../services/enrollment.service');

// GET /api/enrollments - Retrieve all enrollments
exports.getAllEnrollments = async (req, res, next) => {
  try {
    const enrollments = await enrollmentService.getAllEnrollments();
    res.json(enrollments);
  } catch (err) {
    next(err);
  }
};

// GET /api/enrollments/:id - Retrieve a specific enrollment by ID
exports.getEnrollmentById = async (req, res, next) => {
  try {
    const enrollment = await enrollmentService.getEnrollmentById(req.params.id);
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
    res.json(enrollment);
  } catch (err) {
    next(err);
  }
};

// POST /api/enrollments - Create a new enrollment record
exports.createEnrollment = async (req, res, next) => {
  try {
    const newEnrollment = await enrollmentService.createEnrollment(req.body);
    res.status(201).json(newEnrollment);
  } catch (err) {
    next(err);
  }
};

// PUT /api/enrollments/:id - Update an existing enrollment record
exports.updateEnrollment = async (req, res, next) => {
  try {
    const updatedEnrollment = await enrollmentService.updateEnrollment(req.params.id, req.body);
    if (!updatedEnrollment) return res.status(404).json({ message: 'Enrollment not found' });
    res.json(updatedEnrollment);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/enrollments/:id - Delete an enrollment record
exports.deleteEnrollment = async (req, res, next) => {
  try {
    await enrollmentService.deleteEnrollment(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
