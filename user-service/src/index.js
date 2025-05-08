import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/user.route.js';
import { metricsMiddleware, metricsEndpoint } from './metrics.js';
import { loggingMiddleware } from './middlewares/requestLogger.js';
import { logger } from './utils/logger.js';

dotenv.config();

// Initialize Express app
const app = express();

// Use logging middleware
app.use(loggingMiddleware);

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(metricsMiddleware);

// Routes
app.use('/api/users', userRoutes);

// Metrics endpoint
app.get('/metrics', metricsEndpoint);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
