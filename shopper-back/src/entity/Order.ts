import { Product } from "./Product"

export class Order {

    id: number
    customerName: string
    deliveryDate: Date
    total: Number
    products: Product[]

    constructor(id: number, customerName: string, deliveryDate: Date, total: Number, products: Product[]) {
        this.id = id
        this.customerName = customerName
        this.deliveryDate = deliveryDate
        this.total = total
        this.products = products
    }
}