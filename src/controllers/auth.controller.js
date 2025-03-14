const authService = require('../services/auth.service');
const sendResponse = require('../utils/responseHandler');

exports.login = async (req, res, next) => {
  try {
    const tokens = await authService.login(req.body);
    return sendResponse(res, 200, 'success', 'Login successful', tokens);
  } catch (err) {
    next(err);
  }
};


exports.register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    return sendResponse(res, 201, 'success', 'Registration successful', { user });
  } catch (err) {
    next(err);
  }
};


exports.logout = async (req, res, next) => {
  try {
    await authService.logout(req.body.refreshToken, req.user.id);
    return sendResponse(res, 200, 'success', 'Logged out successfully', {});
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
