import express from 'express';
import { createMenuController, listMenuController, getMenuByIdController } from '../controllers/menu.controller.js';

const router = express.Router();

router.post('/', createMenuController);
router.get('/', listMenuController);
router.get('/:id', getMenuByIdController);

export default router;
