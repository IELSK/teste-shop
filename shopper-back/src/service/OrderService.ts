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
        
        await Promise.all(
          order.products.map((product) => {
            this.productService.getById(product.id)
                .then(res => {
                    if(res.quantityOrder <= product.quantityStock) productHasNoStockList.push(product)
                });
          })
        )

        if(productHasNoStockList.length > 0) {
            throw new ProductHasNoStockError(productHasNoStockList)
        }
        
        return await this.orderRepository.create(order)

    }

}