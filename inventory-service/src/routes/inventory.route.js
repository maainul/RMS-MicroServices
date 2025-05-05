import express from 'express';
import {getInventory,getStock,restock,deduct,lowStock,createStock} from '../controllers/inventory.controller.js';

const router = express.Router();

router.get('/', getInventory);
router.get('/low-stock', lowStock);
router.get('/:menuItemId', getStock);
router.post('/create', createStock);
router.post('/restock', restock);
router.post('/deduct', deduct);

export default router;
