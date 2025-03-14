// src/routes/enrollmentRoutes.js
const express = require('express');
const EnrollmentController = require('../controllers/enrollment.controller');
const router = express.Router();

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
 *     responses:
 *       200:
 *         description: A list of enrollments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                     format: uuid
 *                   courseId:
 *                     type: string
 *                     format: uuid
 *                   completed:
 *                     type: boolean
 */
router.get('/', EnrollmentController.getAllEnrollments);

/**
 * @swagger
 * /enrollments/{id}:
 *   get:
 *     summary: Retrieve a specific enrollment by ID
 *     tags: [Enrollments]
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
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 userId:
 *                   type: string
 *                   format: uuid
 *                 courseId:
 *                   type: string
 *                   format: uuid
 *                 completed:
 *                   type: boolean
 *       404:
 *         description: Enrollment not found.
 */
router.get('/:id', EnrollmentController.getEnrollmentById);

/**
 * @swagger
 * /enrollments:
 *   post:
 *     summary: Create a new enrollment
 *     tags: [Enrollments]
 *     requestBody:
 *       required: true
 *       description: Enrollment object to be added.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *               courseId:
 *                 type: string
 *                 format: uuid
 *               completed:
 *                 type: boolean
 *             required:
 *               - userId
 *               - courseId
 *     responses:
 *       201:
 *         description: Enrollment created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 userId:
 *                   type: string
 *                   format: uuid
 *                 courseId:
 *                   type: string
 *                   format: uuid
 *                 completed:
 *                   type: boolean
 *       400:
 *         description: Bad request.
 */
router.post('/', EnrollmentController.createEnrollment);

/**
 * @swagger
 * /enrollments/{id}:
 *   put:
 *     summary: Update an existing enrollment
 *     tags: [Enrollments]
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
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *               courseId:
 *                 type: string
 *                 format: uuid
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Enrollment updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 userId:
 *                   type: string
 *                   format: uuid
 *                 courseId:
 *                   type: string
 *                   format: uuid
 *                 completed:
 *                   type: boolean
 *       404:
 *         description: Enrollment not found.
 */
router.put('/:id', EnrollmentController.updateEnrollment);

/**
 * @swagger
 * /enrollments/{id}:
 *   delete:
 *     summary: Delete an enrollment by ID
 *     tags: [Enrollments]
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
 *       404:
 *         description: Enrollment not found.
 */
router.delete('/:id', EnrollmentController.deleteEnrollment);

module.exports = router;
