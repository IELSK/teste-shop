import { ProductsService } from "../service/ProductsService";
import { Router } from "express";
import { Request, Response } from "express";
import { Controller } from "./Controller";

export class ProductsController implements Controller {

    public path = '/products';
    public router = Router();

    private productsService: ProductsService

    constructor() {
        this.router.get(`${this.path}`, this.listAll)
        this.productsService = new ProductsService()
    }

    public listAll = async (req: Request, res: Response) => {
        await this.productsService.get()
            .then(products => {
                if (products != null && products != undefined) {
                    return res.status(200).send(products)
                } else {
                    return res.status(204)
                }
            })

        
    }
}