import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: String,
    menuItemId: String,
    offerId: String,
    finalPrice: Number,
    originalPrice: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
