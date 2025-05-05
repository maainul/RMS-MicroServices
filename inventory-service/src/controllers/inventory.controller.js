import { InventoryDTO } from '../dto/inventory.dto.js';
import { getInventoryService, getStockByItemService, restockItemService, deductItemService, lowStockService, createInventoryService } from '../services/inventory.service.js';


export const createStock = async (req, res) => {
  try {
    console.log("createStock Controller Called")
    const { menuItemId, quantity } = req.body
    const inventoryDTO = new InventoryDTO(menuItemId, quantity);
    const inventory = await createInventoryService(inventoryDTO);
    res.status(201).json({ message: 'Inventory created successfully', inventory: inventory });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getInventory = async (req, res) => {
  try {
    console.log("getInventory Controller Called")
    const inventory = await getInventoryService();
    res.status(201).json({ message: 'Inventory get successfully', inventory: inventory });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};

export const getStock = async (req, res) => {
  try {
    console.log("getStock Controller Called")
    const stock = await getStockByItemService(req.params.menuItemId);
    res.status(201).json({ message: 'Inventory get stock successfully', inventory: stock });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const restock = async (req, res) => {
  try {
    console.log("restock Controller Called")
    const { menuItemId, quantity } = req.body;
    const result = await restockItemService(menuItemId, quantity);
    res.status(201).json({ message: 'Inventory restock successfully', inventory: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deduct = async (req, res) => {
  try {
    console.log("deduct Controller Called")
    const { menuId, quantity } = req.body;
    const result = await deductItemService(menuId, quantity);
    if (!result) {
      return res.status(400).json({ message: 'Not enough stock' });
    }
    console.log("Inventory deduct successfully")
    res.status(201).json({ message: 'Inventory deduct successfully', inventory: result });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const lowStock = async (req, res) => {
  try {
    console.log("lowStock Controller Called")
    const lowItems = await lowStockService();
    res.status(201).json({ message: 'Inventory deduct successfully', inventory: lowItems });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};