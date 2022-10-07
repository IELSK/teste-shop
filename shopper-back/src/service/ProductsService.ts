import { ProductsRepository } from "../repository/ProductsRepository"

export class ProductsService {

    private productsRepository: ProductsRepository

    constructor() {
        this.productsRepository = new ProductsRepository()
    }

    public get = async (): Promise<any> => {
        return await this.productsRepository.listAll()
    }

    public getById = async (id: Number): Promise<any> => {
        try {
            const result = await this.productsRepository.getById(id)
            return result
        } catch (error) {
            if (error instanceof Error) {
                console.log(`Error getting product by id: ${id}`)
                throw new Error(error.message);
            }
    
        }
    }
}