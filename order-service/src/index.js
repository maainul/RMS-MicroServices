import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import orderRoutes from './routes/order.route.js';

dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);

// Start server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
