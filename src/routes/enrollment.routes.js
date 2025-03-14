// src/routes/enrollmentRoutes.js
const express = require('express');
const EnrollmentController = require('../controllers/enrollment.controller');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/role');
const { check, validationResult } = require('express-validator');
const sendResponse = require('../utils/responseHandler');

/**
 * @swagger
 * components:
 *   schemas:
 *     Enrollment:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *         courseId:
 *           type: string
 *           format: uuid
 *         completed:
 *           type: boolean
 *       required:
 *         - userId
 *         - courseId
 */

/**
 * @swagger
 * tags:
 *   name: Enrollments
 *   description: Endpoints for managing course enrollments
 */

/**
 * @swagger
 * /enrollments:
 *   get:
 *     summary: Retrieve a list of enrollments
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of enrollments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Enrollment'
 *       401:
 *         description: Unauthorized - No token provided or invalid token.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 */
router.get('/', authenticate, authorize(['admin']), EnrollmentController.getAllEnrollments);

/**
 * @swagger
 * /enrollments/{id}:
 *   get:
 *     summary: Retrieve a specific enrollment by ID
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The enrollment ID.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: An enrollment object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enrollment'
 *       401:
 *         description: Unauthorized - No token provided or invalid token.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       404:
 *         description: Enrollment not found.
 */
router.get('/:id', authenticate, authorize(['admin', 'student']), EnrollmentController.getEnrollmentById);

/**
 * @swagger
 * /enrollments:
 *   post:
 *     summary: Create a new enrollment
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Enrollment object to be added.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enrollment'
 *     responses:
 *       201:
 *         description: Enrollment created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enrollment'
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized - No token provided or invalid token.
 */
router.post('/', authenticate, [
  check('userId').isUUID().withMessage('Valid user ID is required'),
  check('courseId').isUUID().withMessage('Valid course ID is required'),
  check('completed').optional().isBoolean().withMessage('Completed must be a boolean value')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, 'error', 'Validation failed', { errors: errors.array() });
  }
  next();
}, EnrollmentController.createEnrollment);

/**
 * @swagger
 * /enrollments/{id}:
 *   put:
 *     summary: Update an existing enrollment
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The enrollment ID.
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       description: Enrollment object with updated data.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enrollment'
 *     responses:
 *       200:
 *         description: Enrollment updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enrollment'
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized - No token provided or invalid token.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       404:
 *         description: Enrollment not found.
 */
router.put('/:id', authenticate, authorize(['admin', 'student']), [
  check('userId').isUUID().withMessage('Valid user ID is required'),
  check('courseId').isUUID().withMessage('Valid course ID is required'),
  check('completed').optional().isBoolean().withMessage('Completed must be a boolean value')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, 'error', 'Validation failed', { errors: errors.array() });
  }
  next();
}, EnrollmentController.updateEnrollment);

/**
 * @swagger
 * /enrollments/{id}:
 *   delete:
 *     summary: Delete an enrollment by ID
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The enrollment ID.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Enrollment deleted successfully.
 *       401:
 *         description: Unauthorized - No token provided or invalid token.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       404:
 *         description: Enrollment not found.
 */
router.delete('/:id', authenticate, authorize(['admin']), EnrollmentController.deleteEnrollment);

module.exports = router;
