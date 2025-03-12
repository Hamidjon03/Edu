// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const { login, refreshToken } = require('../controllers/auth.controller');
const { check, validationResult } = require('express-validator');

// Login route with validation
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

// Refresh token route with validation
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
