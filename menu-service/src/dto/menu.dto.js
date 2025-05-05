export class MenuDTO {
    constructor(name, description, ingredients, price, available, combo,quantity) {
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
        this.price = price;
        this.available = available;
        this.combo = combo;
        this.quantity = quantity;
    }
}
