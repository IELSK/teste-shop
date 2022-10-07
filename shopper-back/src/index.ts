import { App } from "./App";
import { OrderController } from "./controller/OrderController";
import { ProductsController } from "./controller/ProductsController";
import dotenv from 'dotenv';

dotenv.config()

const app = new App([
    new ProductsController(),
    new OrderController()
])

app.listen(Number(process.env.DB_PORT))
