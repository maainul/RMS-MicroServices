import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import menuRoutes from './routes/menu.route.js';
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
app.use('/api/menus', menuRoutes);

// Metrics endpoint
app.get('/metrics', metricsEndpoint);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
