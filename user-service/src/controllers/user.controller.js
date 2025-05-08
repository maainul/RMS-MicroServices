import { findUserByIdUserService, findUserService, registerUser } from '../services/user.service.js';
import { UserDTO } from '../dto/user.dto.js';
import {logger} from '../utils/logger.js';

export const registerController = async (req, res) => {
    try {
        logger.info("Register Controller Called...")
        const { name, email, password } = req.body;
        const userDTO = new UserDTO(name, email, password);
        const newUser = await registerUser(userDTO);
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const findUsersController = async (req, res) => {
    try {
        logger.info("findUsers Controller Called...")
        const users = await findUserService();
        res.status(201).json({ message: 'User fetch successfully', user: users });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const findUserByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    logger.info(`Finding user with ID: ${id}`);
    const user = await findUserByIdUserService(id);

    if (!user) {
      logger.error(`User with ID: ${id} not found`);
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User found successfully', user });
  } catch (error) {
    logger.error(`Error while fetching user with ID: ${id} - ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
