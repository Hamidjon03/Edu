// src/routes/courseRoutes.js
const express = require('express');
const CourseController = require('../controllers/course.controller');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/role');
const { check, validationResult } = require('express-validator');
const sendResponse = require('../utils/responseHandler');

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *       required:
 *         - title
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Retrieve a list of courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: A list of courses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get('/', CourseController.getAllCourses);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Retrieve a single course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID.
 *     responses:
 *       200:
 *         description: A course object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found.
 */
router.get('/:id', authenticate, authorize(['admin', 'instructor', 'student']), CourseController.getCourseById);

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Course object that needs to be added.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: Course created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized - No token provided or invalid token.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 */
router.post('/', authenticate, authorize(['admin', 'instructor']), [
    check('title').isLength({ min: 5, max: 50 }),
    check('description').isLength({ min: 10, max: 200 }),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendResponse(res, 400, { errors: errors.array() });
    }
    next();
}, CourseController.createCourse);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update an existing course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID.
 *     requestBody:
 *       description: Course object that needs to be updated.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       401:
 *         description: Unauthorized - No token provided or invalid token.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       404:
 *         description: Course not found.
 */
router.put('/:id', authenticate, authorize(['admin', 'instructor']), [
    check('title').isLength({ min: 5, max: 50 }),
    check('description').isLength({ min: 10, max: 200 }),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendResponse(res, 400, { errors: errors.array() });
    }
    next();
}, CourseController.updateCourse);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID.
 *     responses:
 *       200:
 *         description: Course deleted successfully.
 *       401:
 *         description: Unauthorized - No token provided or invalid token.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       404:
 *         description: Course not found.
 */
router.delete('/:id', authenticate, authorize(['admin']), CourseController.deleteCourse);

module.exports = router;
