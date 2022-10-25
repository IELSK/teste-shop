import { Product } from "../entity/Product";

export class ProductHasNoStockError extends Error {

    statusCode: number;

    constructor(products: Product[]) {

        let message = "Product has no stock. IDs: "
        products.forEach(product => {
            message = message + `${product.id} `
        })

        super(`${message}`)
        this.statusCode = 400
        Object.setPrototypeOf(this, ProductHasNoStockError.prototype);
    }
}