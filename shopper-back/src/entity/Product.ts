export class Product {

    id: number
    name: string
    price: number
    quantityStock: number
    quantityOrder: number

    constructor(id: number, name: string, price: number, quantityStock: number, quantityOrder: number) {

        this.id = id
        this.name = name
        this.price = price
        this.quantityStock = quantityStock
        this.quantityOrder = quantityOrder
    }
}