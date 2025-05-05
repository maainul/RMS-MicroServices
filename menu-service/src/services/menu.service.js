import { findByNameRepository, createMenuRepository, findAllMenuRepository, findMenuByidRepository } from '../repositories/menu.repository.js';
import axios from 'axios'

const { INVENTORY_SERVICE_BASE_URL } = process.env;


export const createMenuService = async (menu) => {
    // Check if user exists
    const existingMenu = await findByNameRepository(menu.name);
    if (existingMenu) {
        throw new Error('Menu already exists');
    }

    // Create user
    const newMenu = await createMenuRepository(menu);
    // Call Inventory Service to initialize stock
    try {
        await axios.post(`${INVENTORY_SERVICE_BASE_URL}/create`, {
            menuItemId: newMenu._id,
            quantity: menu.quantity || 0
        })
    } catch (error) {
        throw new Error('Inventory setup failed: ' + error.message);
    }
    return newMenu;
};


export const listMenuService = async () => {
    // Check if user exists
    const menus = await findAllMenuRepository();
    if (menus.length === 0) {
        throw new Error('Menu Not Found');
    }

    // Create user
    return menus;
};


export const getMenuByIdService = async (id) => {
    // Check if user exists
    const menus = await findMenuByidRepository(id);
    return menus;
}
