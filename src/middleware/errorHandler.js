const sendResponse = require('../utils/responseHandler');

module.exports = (err, req, res, next) => {
  const statusCode = err.status || 500;
  sendResponse(res, statusCode, 'error', err.message || 'Internal Server Error');
};
