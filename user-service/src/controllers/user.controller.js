import { findUserService, registerUser, findUserByIdUserService } from '../services/user.service.js';
import { UserDTO } from '../dto/user.dto.js';

export const registerController = async (req, res) => {
    try {
        console.log("Register Controller Called...")
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
        console.log("findUsers Controller Called...")
        const users = await findUserService();
        res.status(201).json({ message: 'User fetch successfully', user: users });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const findUserByIdController = async (req, res) => {
    try {
        console.log("findUserById Controller Called...")
        const { id } = req.param
        const user = await findUserByIdUserService(id);
        res.status(201).json({ message: 'User fetch successfully', user: user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};