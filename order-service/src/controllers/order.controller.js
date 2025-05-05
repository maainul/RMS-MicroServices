import axios from 'axios'
import { OrderDTO } from '../dto/order.dto.js';
import { createOrderService, findAllOrderService } from './../services/order.service.js';


export const placeOrderController = async (req, res) => {
    try {
        console.log("createOrderController Controller Called")
        const { userId, menuItemId, offerId, finalPrice, originalPrice,quantity } = req.body;
        const orderDTO = new OrderDTO(userId, menuItemId, offerId, finalPrice, originalPrice,quantity);
        const newOrder = await createOrderService(orderDTO);
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const findAllOrderController = async (req, res) => {
    try {
        console.log("findAllOrderController Controller Called")
        const orders = await findAllOrderService();
        res.status(201).json({ message: 'Order fetch successfully', order: orders });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const findOrderByIdController = async (req, res) => {
    try {
        console.log("findOrderByIdController Controller Called")
        const { id } = req.params
        const order = await findOrderByIdController(id);
        res.status(201).json({ message: 'Order fetch successfully', order: order });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
