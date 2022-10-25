import { API_URL } from "../config";
import axios from "axios";

export const postOrder = (
  body,
  clearForm,
  clearFields,
  setShowAlertSuccess,
  setShowAlertError,
  setAlertMessageError
) => {
    const url = `${API_URL}/orders`
  axios
    .post(url, body)
    .then((res) => {
      setShowAlertSuccess(true);
      clearForm();
      clearFields();
    })
    .catch((err) => {
      console.log(err);
      setShowAlertError(true);
      setAlertMessageError("Não foi possível criar seu pedido.");
      clearForm();
      clearFields();
    });
};
