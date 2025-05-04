import { createOrderRepository, findAllOrderRepository, findOrderByIdRepository } from "../repositories/order.repository.js";
import axios from 'axios'

const { USER_SERVICE, MENU_SERVICE, OFFER_SERVICE } = process.env;

export const createOrderService = async (order) => {

    // validate User
    const userId = order.userId
    const userRes = await axios.get(`${USER_SERVICE}/${userId}`)
    if (!userRes) throw new Error("Order Not Found")

    // validate menu item
    const menuId = order.menuItemId
    const menuRes = await axios.get(`${MENU_SERVICE}/${menuId}`)
    if (!menuRes) throw new Error("Menu Not Found")

    let offerId = order.offerId
    let finalPrice = order.price;
    let originalPrice = order.price;


    // Validate offer if provided
    if (offerId) {
        const offerRes = await axios.get(`${OFFER_SERVICE}/${offerId}`);
        const offer = offerRes.data;
        if (offer && offer.menuItemId === menuId) {
            finalPrice = originalPrice - (originalPrice * offer.discountPercent / 100);
        }
    }

    const newOrder = await createOrderRepository(order);
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
