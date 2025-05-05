import Inventory from "../models/inventory.models.js";

export const findAllInventory = async () => await Inventory.find();

export const findByMenuItemId = async (menuItemId) => await Inventory.findOne({ menuItemId });


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

export const findLowStockItems = async () => await Inventory.find({ $expr: { $lte: ['$quantity', '$restockThreshold'] } });


export const createInventory = async (inventoryData) => {
  const newInventory = new Inventory(inventoryData)
  return await newInventory.save();
}
