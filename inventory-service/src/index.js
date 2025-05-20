import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import inventoryRoutes from './routes/inventory.route.js';
import { metricsMiddleware, metricsEndpoint } from './metrics.js';
import rateLimit from 'express-rate-limit';


dotenv.config();

// Initialize Express app
const app = express();

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
app.use('/api/inventory',limiter, inventoryRoutes);
app.get('/metrics', metricsEndpoint);
// Start server
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
