import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    available: { type: Boolean, required: true, default: true },
    menuId: { type: String }
});

const Offer = mongoose.model('Offer', offerSchema);
export default Offer;
