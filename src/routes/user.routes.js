// src/routes/userRoutes.js
const express = require('express');
const UserController = require('../controllers/user.controller');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/role');
const { check, validationResult } = require('express-validator');
const sendResponse = require('../utils/responseHandler');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *       required:
 *         - name
 *         - email
 *         - password
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - No token provided or invalid token.
 */
router.get('/', authenticate, UserController.getAllUsers);


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - No token provided or invalid token.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       404:
 *         description: User not found.
 */
router.get('/:id', authenticate, authorize(['admin']), UserController.getUserById);
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User object that needs to be added.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized - No token provided or invalid token.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 */
router.post('/', authenticate, authorize(['admin']), UserController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID.
 *     requestBody:
 *       description: Updated user object.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - No token provided or invalid token.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       404:
 *         description: User not found.
 */
router.put('/:id', authenticate, authorize(['admin']), UserController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       401:
 *         description: Unauthorized - No token provided or invalid token.
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *       404:
 *         description: User not found.
 */
router.delete('/:id', authenticate, authorize(['admin']), UserController.deleteUser);

module.exports = router;
