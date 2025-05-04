export class OrderDTO {
    constructor(userId, menuItemId, offerId, finalPrice, originalPrice) {
        this.userId = userId;
        this.menuItemId = menuItemId;
        this.offerId = offerId;
        this.finalPrice = finalPrice;
        this.originalPrice = originalPrice;
    }
}
