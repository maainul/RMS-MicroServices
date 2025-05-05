import { findAllInventory, findByMenuItemId, restockItem, deductItem, findLowStockItems,createInventory } from '../repositories/inventory.repository.js';

export const getInventoryService = async () => await findAllInventory();

export const getStockByItemService = async (menuItemId) => await findByMenuItemId(menuItemId);

export const restockItemService = async (menuItemId, quantity) => await restockItem(menuItemId, quantity);

export const deductItemService = async (menuItemId, quantity) => await deductItem(menuItemId, quantity);

export const lowStockService = async () => await findLowStockItems();

export const createInventoryService = async (inventoryData) => await createInventory(inventoryData);

