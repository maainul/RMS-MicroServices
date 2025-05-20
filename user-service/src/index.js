import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/user.route.js';
import { metricsMiddleware, metricsEndpoint } from './metrics.js';
import { loggingMiddleware } from './middlewares/requestLogger.js';
import { logger } from './utils/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import rateLimit from 'express-rate-limit';

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

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,                  // limit each IP to 100 requests per windowMs
    standardHeaders: true,     // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,      // Disable the `X-RateLimit-*` headers
    message: 'Too many requests from this IP, please try again later.',
})


// Routes
app.use('/api/users',limiter, userRoutes);

// Metrics endpoint
app.get('/metrics', metricsEndpoint);

app.use(errorHandler);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
