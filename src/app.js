const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');``
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
// app.use(morgan('combined'));

// Import routes
const userRoutes = require('./routes/user.routes');
const courseRoutes = require('./routes/course.routes');
const enrollmentRoutes = require('./routes/enrollment.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const authRoutes = require('./routes/auth.routes');

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/auth', authRoutes);

// Swagger UI endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Global error handling middleware
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;
