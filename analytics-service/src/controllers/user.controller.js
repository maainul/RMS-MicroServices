import { registerUser } from '../services/user.service.js';
import { UserDTO } from '../dto/user.dto.js';

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userDTO = new UserDTO(name, email, password);
        const newUser = await registerUser(userDTO);
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
