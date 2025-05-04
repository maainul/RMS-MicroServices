export class OfferDTO {
    constructor(name, description, price, discount, startDate, endDate, available, menuId) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.discount = discount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.available = available;
        this.menuId = menuId;
    }
}
