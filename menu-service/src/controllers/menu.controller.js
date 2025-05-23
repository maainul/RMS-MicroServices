import { createMenuService, listMenuService, getMenuByIdService } from '../services/menu.service.js';
import { MenuDTO } from '../dto/menu.dto.js';

export const createMenuController = async (req, res) => {
    try {
        console.log("createMenu Controller Called")
        const { name, description, ingredients, price, available, combo,quantity } = req.body;
        const menuDTO = new MenuDTO(name, description, ingredients, price, available, combo,quantity);
        const newMenu = await createMenuService(menuDTO);
        res.status(201).json({ message: 'Menu created successfully', menu: newMenu });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const listMenuController = async (req, res) => {
    try {
        console.log("listMenu Controller Called")
        const menus = await listMenuService();
        res.status(201).json({ message: 'Menu get successfully', menus: menus });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getMenuByIdController = async (req, res) => {
    try {
        console.log("getMenuById Controller Called")
        const { id } = req.params
        const menu = await getMenuByIdService(id);
        res.status(201).json({ message: 'Menu get successfully', menu: menu });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
