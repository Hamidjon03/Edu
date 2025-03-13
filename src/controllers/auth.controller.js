// src/controllers/auth.controller.js
const authService = require('../services/auth.service');

exports.login = async (req, res, next) => {
  try {
    const tokens = await authService.login(req.body);
    return sendResponse(res, 200, 'success', 'Login successful', tokens);
  } catch (err) {
    next(err);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const result = await authService.refreshToken(req.body.refreshToken);
    return sendResponse(res, 200, 'success', 'Token refreshed successfully', result);
  } catch (err) {
    next(err);
  }
};
