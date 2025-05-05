export class OrderDTO {
    constructor(userId, menuItemId, offerId, finalPrice, originalPrice,quantity) {
        this.userId = userId;
        this.menuItemId = menuItemId;
        this.offerId = offerId;
        this.finalPrice = finalPrice;
        this.originalPrice = originalPrice;
        this.quantity = quantity;
    }
}
