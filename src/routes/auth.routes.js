// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const { login, refreshToken } = require('../controllers/auth.controller');
const { check, validationResult } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs in a user and returns access and refresh tokens.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       description: User credentials.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successful login returns access and refresh tokens.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       422:
 *         description: Validation errors.
 *       401:
 *         description: Invalid credentials.
 */
router.post('/login', [
  check('username').notEmpty().withMessage('Username is required'),
  check('password').notEmpty().withMessage('Password is required')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}, login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refreshes the access token using a valid refresh token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       description: Refresh token.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             required:
 *               - refreshToken
 *     responses:
 *       200:
 *         description: New access token is generated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       422:
 *         description: Validation errors.
 *       401:
 *         description: Invalid refresh token.
 */
router.post('/refresh', [
  check('refreshToken').notEmpty().withMessage('Refresh token is required')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}, refreshToken);

module.exports = router;
