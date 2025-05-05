import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import inventoryRoutes from './routes/inventory.route.js';

dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/inventory', inventoryRoutes);

// Start server
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
