// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

// Import routes
const courseRoutes = require('./routes/course.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const enrollmentRoutes = require('./routes/enrollment.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes'); // Yangi user marshruti

// Register routes
app.use('/api/courses', courseRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Yangi user endpoint

// Global error handling middleware
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;
