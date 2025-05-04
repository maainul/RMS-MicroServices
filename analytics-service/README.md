Great! Here's how you can design and implement an **Analytics Service** in your Restaurant Management System (RMS):

---

## 📊 **Analytics Service – Purpose**

Tracks and reports data across services, such as:

* Total number of orders
* Top-selling menu items
* Revenue trends
* User order frequency
* Inventory movement
* Offer usage statistics

---

## 🧱 Microservice Overview

| Component         | Details                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| **Tech Stack**    | Node.js + Express + MongoDB (or PostgreSQL for complex queries)         |
| **Communication** | REST API (for now) + Event-driven (later for real-time tracking)        |
| **Data Sources**  | Pulls or receives data from: Order Service, Menu Service, Offer Service |

---

## 🧪 Example Endpoints

| Endpoint                        | Method | Description               |
| ------------------------------- | ------ | ------------------------- |
| `/api/analytics/summary`        | GET    | Basic dashboard summary   |
| `/api/analytics/top-items`      | GET    | Top-selling menu items    |
| `/api/analytics/revenue`        | GET    | Revenue over time         |
| `/api/analytics/user-frequency` | GET    | Orders per user           |
| `/api/analytics/offer-usage`    | GET    | How often offers are used |

---

## 📥 Data Collection Options

### Option 1: REST Polling (Simple)

* Analytics Service makes REST calls to other services regularly and stores stats.

### Option 2: Event-Driven (Recommended Later)

* Other services (Order, Offer, etc.) **emit events** like `order_created`, `offer_applied`
* Analytics Service **consumes those events** and updates stats in real-time

---

## 🧪 Sample Dashboard Summary Response

```json
{
  "totalOrders": 120,
  "totalRevenue": 3500.50,
  "topMenuItems": [
    { "name": "Beef Burger", "count": 30 },
    { "name": "Chicken Wrap", "count": 22 }
  ],
  "activeUsers": 45,
  "mostUsedOffer": "10% OFF Lunch"
}
```

---

Would you like the **starter code** for this service or a **MongoDB schema suggestion** for tracking analytics?
Here’s a **starter setup for the Analytics Service** using **Node.js + Express + MongoDB**:

---

## 📁 Folder Structure

```
analytics-service/
├── controllers/
│   └── analytics.controller.js
├── routes/
│   └── analytics.routes.js
├── services/
│   └── analytics.service.js
├── repositories/
│   └── analytics.repository.js
├── models/
│   └── Analytics.js
├── app.js
├── server.js
└── config/
    └── db.js
```

---

## 🧠 MongoDB Schema (`Analytics.js`)

```js
import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
  totalOrders: Number,
  totalRevenue: Number,
  topMenuItems: [
    {
      menuItemId: mongoose.Schema.Types.ObjectId,
      name: String,
      count: Number,
    }
  ],
  mostUsedOffers: [
    {
      offerId: mongoose.Schema.Types.ObjectId,
      name: String,
      usedCount: Number,
    }
  ],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Analytics', AnalyticsSchema);
```

---

## 🚀 Basic Controller (`analytics.controller.js`)

```js
import { getAnalyticsSummaryService } from "../services/analytics.service.js";

export const getAnalyticsSummary = async (req, res) => {
  try {
    const summary = await getAnalyticsSummaryService();
    res.status(200).json({ message: "Analytics summary fetched", data: summary });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
```

---

## 🧠 Service (`analytics.service.js`)

```js
import { getAnalyticsSummaryRepository } from "../repositories/analytics.repository.js";

export const getAnalyticsSummaryService = async () => {
  return await getAnalyticsSummaryRepository();
};
```

---

## 🗃️ Repository (`analytics.repository.js`)

```js
import Analytics from "../models/Analytics.js";

export const getAnalyticsSummaryRepository = async () => {
  const analytics = await Analytics.findOne().sort({ lastUpdated: -1 });
  return analytics;
};
```

---

## 🔁 Route (`analytics.routes.js`)

```js
import express from 'express';
import { getAnalyticsSummary } from '../controllers/analytics.controller.js';

const router = express.Router();

router.get('/summary', getAnalyticsSummary);

export default router;
```

---

## 🌐 In `app.js`

```js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import analyticsRoutes from './routes/analytics.routes.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/analytics', analyticsRoutes);

export default app;
```

---

## 🏁 In `server.js`

```js
import app from './app.js';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(4005, () => console.log('Analytics Service running on port 4005'));
  })
  .catch(err => console.error(err));
```

---

Perfect — let’s implement **polling from the Order and Menu services** to update analytics data.

---

## ✅ What We’ll Do

1. **Schedule a job** (e.g., every 5 minutes) to:

   * Fetch all orders via REST API from Order Service
   * Aggregate data (total orders, revenue, top menu items, offers used)
   * Save or update analytics document in MongoDB

2. Use **`node-cron`** to run the job on a schedule.

---

## 📦 Install Required Packages

```bash
npm install axios node-cron
```

---

## 🕒 Create `polling.js`

```js
import cron from 'node-cron';
import axios from 'axios';
import Analytics from './models/Analytics.js';

const ORDER_SERVICE_URL = 'http://localhost:4003/api/orders'; // change as needed

const pollAndUpdateAnalytics = async () => {
  try {
    const { data } = await axios.get(`${ORDER_SERVICE_URL}/all`); // adjust endpoint
    const orders = data.order;

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.finalPrice, 0);

    const menuItemMap = {};
    const offerMap = {};

    orders.forEach(order => {
      // Count Menu Items
      if (!menuItemMap[order.menuItemId]) {
        menuItemMap[order.menuItemId] = { count: 1 };
      } else {
        menuItemMap[order.menuItemId].count++;
      }

      // Count Offers
      if (order.offerId) {
        if (!offerMap[order.offerId]) {
          offerMap[order.offerId] = { count: 1 };
        } else {
          offerMap[order.offerId].count++;
        }
      }
    });

    const topMenuItems = Object.entries(menuItemMap).map(([id, value]) => ({
      menuItemId: id,
      name: `MenuItem ${id}`, // Later replace with actual names by calling Menu Service
      count: value.count,
    }));

    const mostUsedOffers = Object.entries(offerMap).map(([id, value]) => ({
      offerId: id,
      name: `Offer ${id}`, // Later replace with actual names by calling Offer Service
      usedCount: value.count,
    }));

    await Analytics.findOneAndUpdate(
      {},
      {
        totalOrders,
        totalRevenue,
        topMenuItems,
        mostUsedOffers,
        lastUpdated: new Date(),
      },
      { upsert: true }
    );

    console.log("✅ Analytics updated at", new Date().toISOString());
  } catch (err) {
    console.error("❌ Failed to poll analytics:", err.message);
  }
};

// Run every 5 minutes
cron.schedule('*/5 * * * *', pollAndUpdateAnalytics);
```

---

## 🧩 In `server.js`

Add this to the end after the server starts:

```js
import './polling.js';
```

---

## ✅ You now have:

* A working analytics service
* Polling every 5 minutes from Order Service
* Real-time summary updates in MongoDB

---

Do you want to enhance this further by:

* Fetching menu/offer names via REST calls?
* Adding charts in frontend later?
