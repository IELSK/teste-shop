import { API_URL } from "../config"
import axios from "axios";

export const listProducts = (setProducts, setShowAlertError, setAlertMessageError) => {
    const url = `${API_URL}/products`
    axios.get(url, {})
        .then(res => {
            setProducts(res.data)
        })
        .catch(err => {
            setShowAlertError(true);
            setAlertMessageError("Não foi possível carregar a lista de produtos.")
        })
}