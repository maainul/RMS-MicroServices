import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import offerRoutes from './routes/offer.route.js';
import { metricsMiddleware, metricsEndpoint } from './metrics.js';

dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(metricsMiddleware);

// Routes
app.use('/api/offers', offerRoutes);

// Metrics endpoint
app.get('/metrics', metricsEndpoint);


// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
