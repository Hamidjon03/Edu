const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add decoded user data to request object
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};
