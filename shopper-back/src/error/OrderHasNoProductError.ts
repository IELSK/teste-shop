export class OrderHasNoProductError extends Error {
    
    statusCode: number;
    
    constructor() {
        super("Order has no product")
        this.statusCode = 400
        Object.setPrototypeOf(this, OrderHasNoProductError.prototype);
    }
    
}