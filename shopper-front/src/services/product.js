import { API_URL } from "../config"
import axios from "axios";

export const listProducts = (setProducts) => {
    const url = `${API_URL}/products`
    axios.get(url, {})
        .then(res => {
            setProducts(res.data)
        })
        .catch(err => {
            console.log(`Error on get list products`)
        })
}