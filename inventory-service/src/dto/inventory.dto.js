export class InventoryDTO {
    constructor(menuItemId, quantity, restockThreshold,lastUpdated) {
        this.menuItemId = menuItemId;
        this.quantity = quantity;
        this.restockThreshold = restockThreshold;
        this.lastUpdated = lastUpdated;
    }
}
