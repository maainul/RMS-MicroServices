Yes, **Stock and Inventory** should be implemented as a **separate microservice** — let’s call it the **Inventory Service**.

---

## ✅ Why a Separate Inventory Service?

In microservices architecture, **each service should own its domain and data**. Since inventory management has its own business logic (like tracking stock, reducing stock when orders are placed, restocking, low-stock alerts, etc.), it deserves its own service.

---

## 🧱 Responsibilities of the Inventory Service

Here’s what the **Inventory Service** should manage:

### 📦 Core Responsibilities:

1. **Track Stock**:

   * Store current stock levels of each menu item or ingredient.

2. **Update Stock on Order**:

   * Reduce stock quantity when an order is placed.

3. **Restock Items**:

   * Update stock when new supplies arrive.

4. **Low Stock Alerts**:

   * Notify admin if an item is running low.

5. **Ingredient-Level Tracking (optional)**:

   * For advanced RMS, you can track raw materials (e.g., cheese, flour) used in menu items.

---

## 📡 Communication with Other Services

### 🔁 Sync (REST-based for now):

* `Order Service → Inventory Service`: After an order is placed, call Inventory API to **deduct stock**.

### 🔄 Later (Async):

You can use **Kafka/RabbitMQ** to **publish an event like `OrderPlaced`**, and let Inventory Service **consume** it to update stock.

---

## 📂 Example Endpoints of Inventory Service

| Method | Endpoint                 | Description                        |
| ------ | ------------------------ | ---------------------------------- |
| GET    | `/inventory`             | Get all inventory items            |
| GET    | `/inventory/:menuItemId` | Get stock info for a specific item |
| POST   | `/inventory/restock`     | Add or restock item                |
| POST   | `/inventory/deduct`      | Deduct stock after order placed    |
| GET    | `/inventory/low-stock`   | Get list of low-stock items        |

---

## 🧱 Database Example Schema

You can use **MongoDB** with a simple structure like:

```js
{
  menuItemId: ObjectId("..."),
  quantity: 25,
  restockThreshold: 5,
  lastUpdated: Date
}
```

---

## 🛠 Tech Stack

Since your stack is Node.js + Express, you can create the Inventory service like your other ones:

* `controllers/inventoryController.js`
* `services/inventoryService.js`
* `repositories/inventoryRepository.js`
* `models/Inventory.js`

---

Would you like me to give you a **starter code template** for this Inventory Service?


Great! Here's a **starter code template** for your **Inventory Service** using **Node.js + Express + MongoDB**:

---

## 📁 Project Structure

```
inventory-service/
├── controllers/
│   └── inventoryController.js
├── services/
│   └── inventoryService.js
├── repositories/
│   └── inventoryRepository.js
├── models/
│   └── Inventory.js
├── routes/
│   └── inventoryRoutes.js
├── app.js
├── server.js
└── config/
    └── db.js
```

---

## 🧱 1. `models/Inventory.js`

```js
import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'MenuItem', // Optional, for future use
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  restockThreshold: {
    type: Number,
    default: 5,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Inventory', inventorySchema);
```

---

## 🧠 2. `repositories/inventoryRepository.js`

```js
import Inventory from '../models/Inventory.js';

export const findAllInventory = async () => await Inventory.find();

export const findByMenuItemId = async (menuItemId) => {
  return await Inventory.findOne({ menuItemId });
};

export const restockItem = async (menuItemId, quantity) => {
  return await Inventory.findOneAndUpdate(
    { menuItemId },
    { $inc: { quantity }, lastUpdated: new Date() },
    { new: true, upsert: true }
  );
};

export const deductItem = async (menuItemId, quantity) => {
  return await Inventory.findOneAndUpdate(
    { menuItemId, quantity: { $gte: quantity } },
    { $inc: { quantity: -quantity }, lastUpdated: new Date() },
    { new: true }
  );
};

export const findLowStockItems = async () => {
  return await Inventory.find({ $expr: { $lte: ['$quantity', '$restockThreshold'] } });
};
```

---

## ⚙️ 3. `services/inventoryService.js`

```js
import {
  findAllInventory,
  findByMenuItemId,
  restockItem,
  deductItem,
  findLowStockItems,
} from '../repositories/inventoryRepository.js';

export const getInventoryService = async () => await findAllInventory();

export const getStockByItemService = async (menuItemId) => await findByMenuItemId(menuItemId);

export const restockItemService = async (menuItemId, quantity) =>
  await restockItem(menuItemId, quantity);

export const deductItemService = async (menuItemId, quantity) =>
  await deductItem(menuItemId, quantity);

export const lowStockService = async () => await findLowStockItems();
```

---

## 🌐 4. `controllers/inventoryController.js`

```js
import {
  getInventoryService,
  getStockByItemService,
  restockItemService,
  deductItemService,
  lowStockService,
} from '../services/inventoryService.js';

export const getInventory = async (req, res) => {
  const inventory = await getInventoryService();
  res.json(inventory);
};

export const getStock = async (req, res) => {
  const stock = await getStockByItemService(req.params.menuItemId);
  res.json(stock);
};

export const restock = async (req, res) => {
  const { menuItemId, quantity } = req.body;
  const result = await restockItemService(menuItemId, quantity);
  res.json(result);
};

export const deduct = async (req, res) => {
  const { menuItemId, quantity } = req.body;
  const result = await deductItemService(menuItemId, quantity);
  if (!result) {
    return res.status(400).json({ message: 'Not enough stock' });
  }
  res.json(result);
};

export const lowStock = async (req, res) => {
  const lowItems = await lowStockService();
  res.json(lowItems);
};
```

---

## 🛣️ 5. `routes/inventoryRoutes.js`

```js
import express from 'express';
import {
  getInventory,
  getStock,
  restock,
  deduct,
  lowStock,
} from '../controllers/inventoryController.js';

const router = express.Router();

router.get('/', getInventory);
router.get('/low-stock', lowStock);
router.get('/:menuItemId', getStock);
router.post('/restock', restock);
router.post('/deduct', deduct);

export default router;
```

---

## 🔌 6. `config/db.js`

```js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Inventory DB Connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
```

---

## 🚀 7. `app.js`

```js
import express from 'express';
import inventoryRoutes from './routes/inventoryRoutes.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/inventory', inventoryRoutes);

export default app;
```

---

## 🖥️ 8. `server.js`

```js
import app from './app.js';

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Inventory Service running on port ${PORT}`);
});
```

---

## ✅ Sample `.env`

```
MONGO_URI=mongodb://localhost:27017/inventoryService
```

---

This code is **clean**, **modular**, and follows your architecture (controller-service-repository-model). You're ready to:

* Connect `Order Service` to call `POST /api/inventory/deduct`
* Add logic to `restock` via admin dashboard
* Send alerts for `low-stock`

Want help with how the Order Service should interact with this Inventory Service?


Perfect! Here’s how your **Order Service** can **interact with the Inventory Service** using **REST API calls** in a microservices setup.

---

## ✅ Scenario: Deduct Stock When Placing an Order

### 🧠 Logic:

When an order is placed:

1. Order Service calls Inventory Service to deduct stock.
2. If stock is available → order is placed.
3. If not → return error (e.g., "Out of stock").

---

## 📦 In Order Service

### 🔁 Step 1: Install Axios

```bash
npm install axios
```

---

### ⚙️ Step 2: Create Utility to Call Inventory

**`utils/inventoryClient.js`**

```js
import axios from 'axios';

const INVENTORY_SERVICE_URL = process.env.INVENTORY_SERVICE_URL || 'http://localhost:5004';

export const deductStock = async (menuItemId, quantity) => {
  try {
    const res = await axios.post(`${INVENTORY_SERVICE_URL}/api/inventory/deduct`, {
      menuItemId,
      quantity,
    });
    return res.data;
  } catch (err) {
    throw new Error('Inventory Service: ' + err.response?.data?.message || err.message);
  }
};
```

---

### 🛒 Step 3: Use it in Order Flow

**`services/orderService.js`**

```js
import { deductStock } from '../utils/inventoryClient.js';
import Order from '../models/Order.js';

export const placeOrderService = async ({ userId, menuItemId, offerId, quantity }) => {
  // Deduct stock from inventory
  await deductStock(menuItemId, quantity);

  // Proceed to create the order
  const order = await Order.create({
    userId,
    menuItemId,
    offerId,
    quantity,
    originalPrice: 50.5,
    finalPrice: 50.5,
  });

  return order;
};
```

---

## 🌐 .env for Order Service

```
INVENTORY_SERVICE_URL=http://localhost:5004
```

---

## ❗ Error Handling

If stock is not enough, your `Inventory Service` sends:

```json
{
  "message": "Not enough stock"
}
```

So, in the `Order Service`, catch that error and return a proper response:

```js
catch (error) {
  return res.status(400).json({ message: error.message });
}
```

---

## ✅ Bonus: Stock Check Before Order

You can also add a check route in Inventory like:

```
GET /api/inventory/:menuItemId
```

Then in your frontend or order form, you can check stock before showing "Place Order" button.

---

Would you like a similar integration for **restocking from Admin Panel**, or for sending **low-stock alerts** later on?

Great! Let’s break it down into two key features you can implement in your **Inventory (Stock) Service**:

---

## ✅ 1. **Restock Inventory from Admin Panel**

### 📌 Use Case:

Admins should be able to **add stock** when inventory is low.

---

### 📦 Endpoint: `POST /api/inventory/restock`

```ts
// controller/restockController.js
export const restockInventory = async (req, res) => {
  try {
    const { menuItemId, quantity } = req.body;
    const updated = await restockService(menuItemId, quantity);
    res.status(200).json({ message: 'Stock updated', data: updated });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
```

```ts
// service/restockService.js
import Inventory from '../models/Inventory.js';

export const restockService = async (menuItemId, quantity) => {
  const inventory = await Inventory.findOne({ menuItemId });
  if (!inventory) {
    // If no record exists, create it
    return await Inventory.create({ menuItemId, quantity });
  }
  inventory.quantity += quantity;
  await inventory.save();
  return inventory;
};
```

---

## ✅ 2. **Low Stock Alert (Optional for Future)**

### 🔁 Option A: Periodic Cron Job (e.g., using `node-cron`)

Checks inventory levels every hour/day and notifies admin (email/log/UI).

### 🔁 Option B: Check during every order

If quantity drops below a threshold (e.g., 5), log a warning or send a message to a notification service.

```ts
if (inventory.quantity < 5) {
  console.warn(`Low stock alert for menuItemId ${menuItemId}`);
  // Or integrate with Notification microservice later
}
```

---

## 🛠️ Sample `Inventory` Model (MongoDB/Mongoose)

```js
const inventorySchema = new mongoose.Schema({
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Menu',
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.model('Inventory', inventorySchema);
```

---

## 🧪 Testing With Postman (Restock)

```
POST http://localhost:5004/api/inventory/restock

{
  "menuItemId": "6816fb82f63cbd1892dad6a4",
  "quantity": 20
}
```

---

Would you like me to provide a ready React admin page for restocking too?
