import express from 'express';
import { createOfferController, findAllOfferController, findOfferByIdController } from '../controllers/offer.controller.js';


const router = express.Router();

router.post('/', createOfferController);
router.get('/', findAllOfferController);
router.get('/:id', findOfferByIdController);

export default router;
