import { logger } from '../utils/logger.js';
import User from './../models/user.models.js';

export const findUserByEmail = async (email) => {
  return await User.findOne({ email })
};

export const createUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

export const findUsers = async () => {
  return await User.find()
};


export const findUserById = async (id) => {
  try {
    logger.info(`Executing database query to find user by ID: ${id}`);
    const user = await User.findById(id);
    return user;
  } catch (error) {
    logger.error(`Error executing database query for user ID: ${id} - ${error.message}`);
    throw new Error('Database query failed');
  }
};
