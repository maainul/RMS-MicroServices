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

const Inventory = mongoose.model('Inventory', inventorySchema);
export default Inventory;
