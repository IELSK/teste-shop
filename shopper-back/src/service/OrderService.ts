import { Order } from "../entity/Order";
import { OrderHasNoProductError } from "../error/OrderHasNoProductError";
import { OrderRepository } from "../repository/OrderRepository";
import { ProductsService } from "./ProductsService";
import { ProductHasNoStockError } from "../error/ProductHasNoStockError";

export class OrderService {

    private orderRepository: OrderRepository
    private productService: ProductsService

    constructor() {
        this.orderRepository = new OrderRepository()
        this.productService = new ProductsService()
    }

    public get = async (): Promise<any> => {
        return await this.orderRepository.listAll()
    }

    public create = async (order: Order): Promise<any> => {

        if (order.products == null || order.products == undefined || order.products.length <= 0) {
            throw new OrderHasNoProductError()
        }

        const productHasNoStockList: any[] = []

        for (const product of order.products) {
            const result = await this.productService.getById(product.id)
            if (result.quantityStock < product.quantityOrder) productHasNoStockList.push(product)
        }


        if (productHasNoStockList.length > 0) {
            throw new ProductHasNoStockError(productHasNoStockList)
        }


        return await this.orderRepository.create(order)

    }

}