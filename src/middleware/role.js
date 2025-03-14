const jwt = require('jsonwebtoken');
const sendResponse = require('../utils/responseHandler');

// Authentication middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token

  if (!token) {
    return sendResponse(res, 401, 'error', 'Unauthorized: No token provided.');
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add decoded user data to request object
    next();
  } catch (err) {
    return sendResponse(res, 401, 'error', 'Unauthorized: Invalid token.');
  }
};

// Authorization middleware
const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  
  return (req, res, next) => {
    if (!req.user) {
      return sendResponse(res, 401, 'error', 'Unauthorized: No token provided');
    }
    
    if (roles.length && !roles.includes(req.user.role)) {
      return sendResponse(res, 403, 'error', 'Forbidden: Insufficient permissions');
    }
    
    next();
  };
};

module.exports = { 
  authenticate,
  authorize 
};