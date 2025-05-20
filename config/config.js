import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Required to simulate __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const config = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/test-api',
  jwtSecret: process.env.JWT_SECRET || 'supersecretkey',
  services: {
    user: process.env.USER_SERVICE_URL || 'http://localhost:5000',
    order: process.env.ORDER_SERVICE_URL || 'http://localhost:5003',
    menu: process.env.MENU_SERVICE_URL || 'http://localhost:5001',
    inventory: process.env.INVENTORY_SERVICE_URL || 'http://localhost:5004',
    offer: process.env.OFFER_SERVICE_URL || 'http://localhost:5002',
    analytics: process.env.ANALYTIC_SERVICE_URL || 'http://localhost:5005',
  },
};

export default config
