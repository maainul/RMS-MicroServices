import { createOrderRepository, findAllOrderRepository, findOrderByIdRepository } from "../repositories/order.repository.js";
import axios from 'axios'

const { USER_SERVICE, MENU_SERVICE, OFFER_SERVICE, INVENTORY_SERVICE } = process.env;

export const createOrderService = async (order) => {
    const { userId, menuItemId: menuId, quantity, offerId } = order;
    let finalPrice = order.price;
    const originalPrice = order.price;

    try {
        console.log("createOrderService: Validating user...");
        const userRes = await axios.get(`${USER_SERVICE}/${userId}`);
        console.log("#############",userRes)
        if (!userRes.data) throw new Error("User not found");
    } catch (err) {
        console.error("User validation failed:", err.message);
        throw new Error("User Not Found");
    }

    try {
        console.log("createOrderService: Validating menu item...");
        const menuRes = await axios.get(`${MENU_SERVICE}/${menuId}`);
        if (!menuRes.data) throw new Error("Menu not found");
    } catch (err) {
        console.error("Menu validation failed:", err.message);
        throw new Error("Menu Not Found");
    }

    if (offerId) {
        try {
            console.log("createOrderService: Checking offer...");
            const offerRes = await axios.get(`${OFFER_SERVICE}/${offerId}`);
            const offer = offerRes.data;
            if (offer && offer.menuItemId === menuId) {
                finalPrice = originalPrice - (originalPrice * offer.discountPercent / 100);
            }
        } catch (err) {
            console.warn("Offer check skipped:", err.message);
        }
    }

    try {
        console.log("createOrderService: Deducting inventory...");
        const inventoryRes = await axios.post(`${INVENTORY_SERVICE}/deduct`, {
            menuId,
            quantity
        });

        const inventory = inventoryRes.data.inventory;
        if (!inventory || !inventory._id) {
            throw new Error("Invalid inventory response");
        }
    } catch (err) {
        console.error("Inventory deduction failed:", err.message);
        throw new Error("Inventory deduction failed");
    }

    console.log("createOrderService: Creating order...");
    const newOrder = await createOrderRepository({
        ...order,
        finalPrice
    });

    return newOrder;
};



export const findAllOrderService = async () => {
    const orders = await findAllOrderRepository();
    return orders;
};

export const findOrderByIdService = async (id) => {
    const order = await findOrderByIdRepository(id);
    return order;
};
