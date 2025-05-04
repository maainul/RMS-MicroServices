import express from 'express';
import { findUserByIdController, findUsersController, registerController } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', findUsersController);
router.get('/:id', findUserByIdController);
router.post('/register', registerController);

export default router;
