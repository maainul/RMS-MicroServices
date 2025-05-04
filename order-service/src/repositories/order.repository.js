import Order from '../models/order.models.js';

export const findAllOrderRepository = async () => {
  return await Order.find()
};

export const findOrderByIdRepository = async (id) => {
  return await Order.findById(id)
};

export const createOrderRepository = async (orderData) => {
  const newOrder = new Order(orderData);
  return await newOrder.save();
};
