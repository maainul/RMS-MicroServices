import express from 'express';

import { placeOrderController, findAllOrderController, findOrderByIdController } from './../controllers/order.controller.js';

const router = express.Router();

router.post('/', placeOrderController);
router.get('/:id', findOrderByIdController);
router.get('/', findAllOrderController);

export default router;
