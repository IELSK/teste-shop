import { connection } from "../connection";
import { Product } from "../entity/Product";

export class ProductsRepository {

    private static TABLE_NAME = "shopper_products";

    listAll = async (): Promise<any> => {
        try {
            const result = await connection
                .select('id', 'name', 'price', 'qty_stock as quantityStock')
                .table(ProductsRepository.TABLE_NAME)
            console.log(result)
            return result
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    getById = async (id: Number): Promise<any> => {
        try {
            const result = await connection.select('id', 'name', 'price', 'qty_stock as quantityStock')
                .where('id', id)
                .table(ProductsRepository.TABLE_NAME)
            return result[0];
        } catch (error) {
            if (error instanceof Error) {
                console.log(`Error on get product by id. ProductId: ${id}`)
                throw new Error(error.message);
            }
        }

    }


    updateStock = async (operation: string, productdId: Number, quantityStock: Number): Promise<any> => {
        try {
            const result = await connection.raw(`
            UPDATE ${ProductsRepository.TABLE_NAME} set qty_stock = qty_stock ${operation} ${quantityStock} WHERE id = ${productdId}
        `)
            if (operation === "-") {
                console.log(`Stock of product ${productdId} was substracted succesfully.`)
            }
            return result
        } catch (error) {
            if (error instanceof Error) {
                console.log(`Error on stock update of product ${productdId}`)
                throw new Error(error.message);
            }
        }
    }
}