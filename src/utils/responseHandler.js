const sendResponse = (res, statusCode, status, message, data = null) => {
    const response = { status, message };
    if (data !== null) response.data = data;
    res.status(statusCode).json(response);
  };
  
  module.exports = sendResponse;
  