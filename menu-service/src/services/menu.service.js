import { findByNameRepository, createMenuRepository, findAllMenuRepository, findMenuByidRepository } from '../repositories/menu.repository.js';

export const createMenuService = async (menu) => {
    // Check if user exists
    const existingMenu = await findByNameRepository(menu.name);
    if (existingMenu) {
        throw new Error('Menu already exists');
    }

    // Create user
    const newMenu = await createMenuRepository(menu);
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
