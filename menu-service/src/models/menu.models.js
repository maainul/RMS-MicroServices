import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    ingredients: {
        type: String,
    },
    price: {
        type: Number,
    },
    available: {
        type: Boolean,
    },
    combo: {
        type: Boolean,
    }

});

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;
