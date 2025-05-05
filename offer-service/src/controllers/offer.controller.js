import { OfferDTO } from "../dto/offer.dto.js";
import { createOfferService, findAllOfferService, findOfferByIdService } from './../services/offer.service.js';



export const createOfferController = async (req, res) => {
    try {
        console.log("createOffer Controller Called...")
        const { name, description, price, discount, startDate, endDate, available, menuId } = req.body;
        const offerDTO = new OfferDTO(name, description, price, discount, startDate, endDate, available, menuId);
        const newOffer = await createOfferService(offerDTO);
        res.status(201).json({ message: 'Offer created successfully', offer: newOffer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const findAllOfferController = async (req, res) => {
    try {
        console.log("findAllOffer Controller Called...")
        const offers = await findAllOfferService();
        res.status(201).json({ message: 'Offer fetch successfully', offers: offers });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const findOfferByIdController = async (req, res) => {
    try {
        console.log("findOfferById Controller Called...")
        const { id } = req.params
        const offer = await findOfferByIdService(id);
        res.status(201).json({ message: 'Offer fetch successfully', offers: offer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
