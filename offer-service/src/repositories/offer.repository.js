import Offer from './../models/offer.models.js';

export const findUserByNameRepository = async (name) => {
  return await Offer.findOne({ name })
};

export const createOfferRepository = async (offerData) => {
  const newOffer = new Offer(offerData);
  return await newOffer.save();
};

export const findAllOfferRepository = async () => {
  return await Offer.find()
};


export const findOfferByIdRepository = async (id) => {
  return await Offer.findById(id)
};
