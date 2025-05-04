import { createOfferRepository, findAllOfferRepository, findUserByNameRepository, findOfferByIdRepository } from './../repositories/offer.repository.js';
import axios from 'axios';

const MENU_SERVICE_BASE_URL = process.env.MENU_SERVICE_BASE_URL;


export const createOfferService = async (offer) => {
    // Check if user exists
    const existingOffer = await findUserByNameRepository(offer.name);
    if (existingOffer) {
        throw new Error('Offer already exists');
    }
    // validate Menu Item
    const menuItemResponse = await axios.get(`${MENU_SERVICE_BASE_URL}/${offer.menuId}`)
    const menuItem = menuItemResponse.data

    if (!menuItem) {
        throw new Error("Invalid menu item id")
    }

    // Create offer
    const newOffer = await createOfferRepository(offer);
    return newOffer;
};


export const findAllOfferService = async () => {
    const offers = await findAllOfferRepository()
    if (offers.length === 0) {
        throw new Error('Offer Not Found');
    }

    return offers;
};

export const findOfferByIdService = async (id) => {
    const offer = await findOfferByIdRepository(id)
    return offer;
};
