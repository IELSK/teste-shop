import { API_URL } from "../config";
import axios from "axios";

export const postOrder = (
  body,
  clearForm,
  clearFields,
  setShowAlertSuccess,
  setShowAlertError
) => {
    const url = `${API_URL}/orders`
  axios
    .post(url, body, {})
    .then((res) => {
      setShowAlertSuccess(true);
      clearForm();
      clearFields();
    })
    .catch((err) => {
      console.log(err);
      setShowAlertError("Não foi possível criar seu pedido.");
      clearForm();
      clearFields();
    });
};
