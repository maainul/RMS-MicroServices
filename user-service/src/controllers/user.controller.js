// controllers/user.controller.js
import { catchAsync } from '../utils/catchAsync.js';
import {
  findUserByIdUserService,
  findUserService,
  registerUser,
} from '../services/user.service.js';
import { UserDTO } from '../dto/user.dto.js';
import { logger } from '../utils/logger.js';

export const registerController = catchAsync(async (req, res) => {
  logger.info('Register Controller Called...');
  const { name, email, password } = req.body;
  const userDTO = new UserDTO(name, email, password);
  const newUser = await registerUser(userDTO);
  res.status(201).json({ message: 'User created successfully', user: newUser });
});

export const findUsersController = catchAsync(async (req, res) => {
  logger.info('findUsers Controller Called...');
  const users = await findUserService();
  res.status(200).json({ message: 'Users fetched successfully', user: users });
});

export const findUserByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;
  logger.info(`Finding user with ID: ${id}`);
  const user = await findUserByIdUserService(id);
  res.status(200).json({ message: 'User found successfully', user });
});
