import express from 'express';

import { createOrderController, findAllOrderController, findOrderByIdController } from './../controllers/order.controller.js';

const router = express.Router();

router.post('/', createOrderController);
router.get('/:id', findOrderByIdController);
router.get('/', findAllOrderController);

export default router;
