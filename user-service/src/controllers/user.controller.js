import {
  findUserByIdUserService,
  findUserService,
  registerUser
} from '../services/user.service.js';
import { UserDTO } from '../dto/user.dto.js';
import { logger } from '../utils/logger.js';

export const registerController = async (req, res, next) => {
  try {
    logger.info('Register Controller Called...');
    const { name, email, password } = req.body;
    const userDTO = new UserDTO(name, email, password);
    const newUser = await registerUser(userDTO);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    next(error);
  }
};

export const findUsersController = async (req, res, next) => {
  try {
    logger.info('findUsers Controller Called...');
    const users = await findUserService();
    res.status(200).json({ message: 'Users fetched successfully', user: users });
  } catch (error) {
    next(error);
  }
};

export const findUserByIdController = async (req, res, next) => {
  const { id } = req.params;
  try {
    logger.info(`Finding user with ID: ${id}`);
    const user = await findUserByIdUserService(id);
    res.status(200).json({ message: 'User found successfully', user });
  } catch (error) {
    logger.error(`Error while fetching user with ID: ${id} - ${error.message}`);
    next(error);
  }
};
