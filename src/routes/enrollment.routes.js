// src/routes/enrollmentRoutes.js
const express = require('express');
const EnrollmentController = require('../controllers/enrollment.controller');
const router = express.Router();

router.get('/', EnrollmentController.getAllEnrollments);
router.get('/:id', EnrollmentController.getEnrollmentById);
router.post('/', EnrollmentController.createEnrollment);
router.put('/:id', EnrollmentController.updateEnrollment);
router.delete('/:id', EnrollmentController.deleteEnrollment);

module.exports = router;
