import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail, findUsers, findUserById } from '../repositories/user.repository.js';
import { logger } from '../utils/logger.js';

export const registerUser = async (user) => {
  // Check if user exists
  const existingUser = await findUserByEmail(user.email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;

  // Create user
  const newUser = await createUser(user);
  return newUser;
};


export const findUserService = async () => {
  const users = await findUsers();
  if (users.length === 0) {
    throw new Error('No Data Found');
  }
  return users;
};




export const findUserByIdUserService = async (id) => {
  try {
    logger.info(`Searching for user by ID: ${id}`);
    const user = await findUserById(id);
    if (!user) {
      logger.error(`No user found with ID: ${id}`);
    }
    return user;
  } catch (error) {
    logger.error(`Error while finding user by ID: ${id} - ${error.message}`);
    throw new Error('Failed to fetch user');
  }
};
