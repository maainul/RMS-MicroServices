import bcrypt from 'bcryptjs';
import { logger } from '../utils/logger.js';
import { APIError } from '../utils/ApiError.js';

import { createUser, findUserByEmail, findUsers, findUserById } from '../repositories/user.repository.js';

// Register a new user
export const registerUser = async (user) => {
  const existingUser = await findUserByEmail(user.email);
  if (existingUser) {
    logger.warn(`Attempt to register existing user: ${user.email}`);
    throw new APIError('User already exists', 409);
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;

  const newUser = await createUser(user);
  logger.info(`User created with email: ${newUser.email}`);
  return newUser;
};

// Get all users
export const findUserService = async () => {
  const users = await findUsers();
  if (users.length === 0) {
    logger.warn('No users found in the system');
    throw new APIError('No users found', 404);
  }
  return users;
};

// Get user by ID
export const findUserByIdUserService = async (id) => {
  logger.info(`Searching for user by ID: ${id}`);
  const user = await findUserById(id);
  if (!user) {
    logger.error(`No user found with ID: ${id}`);
    throw new APIError('User not found', 404);
  }
  return user;
};
