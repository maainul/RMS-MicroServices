
import Menu from './../models/menu.models.js';
export const findByNameRepository = async (name) => {
  return await Menu.findOne({ name })
};

export const createMenuRepository = async (menuData) => {
  const newMenu = new Menu(menuData);
  return await newMenu.save();
};

export const findAllMenuRepository = async () => {
  return await Menu.find()
};


export const findMenuByidRepository = async (id) => {
  return await Menu.findById(id)
};
