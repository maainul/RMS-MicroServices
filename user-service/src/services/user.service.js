import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail, findUsers, findUserById } from '../repositories/user.repository.js';

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
    const user = await findUserById(id);
    return user;
};
