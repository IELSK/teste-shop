import { OrderService } from "../service/OrderService";
import { Order } from "../entity/Order";
import { Request, Response } from "express";
import { Router } from "express";
import { Controller } from "./Controller";

export class OrderController implements Controller {

    public path = '/orders';
    public router = Router();

    private orderService: OrderService

    constructor() {
        this.router.get(`${this.path}`, this.listAll)
        this.router.post(`${this.path}`, this.create)
        this.orderService = new OrderService()
    }

    public listAll = async (req: Request, res: Response) => {
        await this.orderService.get()
            .then(orders => {
                if (orders != null && orders != undefined) {
                    return res.status(200).send(orders)
                } else {
                    return res.status(204)
                }
            })

    }

    public create = async (req: Request, res: Response) => {
        const order = req.body as Order

        if (order != null && order != undefined) {
            await this.orderService.create(order)
                .then(result => { return res.status(201).send(result) })
        } else {
            return res.status(400).send("Can't possibly create order.")
        }

    }

}

