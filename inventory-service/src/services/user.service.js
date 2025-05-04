import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '../repositories/user.repository.js';

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
