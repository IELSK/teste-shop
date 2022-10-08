import "./App.css";
import { useCallback, useEffect, useState } from "react";
import useForm from "./hooks/useForm";
import "react-bootstrap-typeahead/css/Typeahead.css";
import Header from "./components/layouts/Header";
import { listProducts } from "./services/product";
import { postOrder } from "./services/order";
import { Alert, Autocomplete, Snackbar, TextField } from "@mui/material";
import CustomButton from "./components/buttons/CustomButton";

function App() {
  const [updatedTotal, setUpdatedTotal] = useState(0);
  const [selected, setSelected] = useState([]);
  const [showAlertError, setShowAlertError] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [alertMessageError, setAlertMessageError] = useState("");
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [form, onChange, clearForm, setForm] = useForm({
    customerName: "",
    deliveryDate: "",
    products: [],
  });

  const createOrder = () => {
    if (
      form.customerName === "" ||
      form.deliveryDate === "" ||
      form.products.length <= 0
    ) {
      setAlertMessageError(
        "Você precisa adicionar todas as informações para criar o pedido."
      );
      setShowAlertError(true);
      return;
    }

    const body = {
      customerName: form.customerName,
      deliveryDate: form.deliveryDate,
      total: Number(updatedTotal),
      products: form.products,
    };

    postOrder(
      body,
      clearForm,
      clearFields,
      setShowAlertSuccess,
      setShowAlertError
    );
  };

  const onClickAddProduct = () => {
    if (quantity === null || quantity === "" || quantity <= 0) {
      setAlertMessageError("Você precisa escolher a quantidade desejada.");
      setShowAlertError(true);
      return;
    }
    if (quantity > selected.quantityStock) {
      setAlertMessageError("A quantidade que você deseja não esta disponível.");
      setShowAlertError(true);
      return;
    }

    const product = {
      id: selected.id,
      name: selected.name,
      price: selected.price,
      quantityStock: selected.quantityStock,
      quantityOrder: Number(quantity),
    };

    const filteredProducts = form.products.filter((addedProduct) => {
      if (addedProduct.id === product.id) {
        return false;
      }
      return true;
    });
    setForm({
      ...form,
      products: [...filteredProducts, product],
    });

    setQuantity("");
  };

  const deleteProduct = (productId) => {
    const updatedProducts = form.products.filter((product) => {
      if (product.id === productId) {
        return false;
      }
      return true;
    });
    setForm({
      ...form,
      products: updatedProducts,
    });
  };

  const editProduct = (product) => {
    setSelected(product);
    setQuantity(product.quantityOrder);
  };

  const listAddedProducts = form.products.map((product) => {
    return (
      <tr key={product.id}>
        <td>{product.name}</td>
        <td>
          {product.price.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </td>
        <td>{product.quantityOrder}</td>
        <td>
          <span className="inline-block mb-1">
            <CustomButton
              onClickFunction={() => editProduct(product)}
              buttonName="Editar"
            />
          </span>
          <CustomButton
            onClickFunction={() => deleteProduct(product.id)}
            buttonName="Deletar"
          />
        </td>
      </tr>
    );
  });

  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const orderTotal = useCallback(() => {
    let totalSum = 0;
    for (let product of form.products) {
      totalSum += product.price * product.quantityOrder;
    }
    setUpdatedTotal(totalSum);
  }, [form]);

  const clearOrder = () => {
    clearForm();
    clearFields();
  };

  const clearFields = () => {
    setQuantity("");
    setUpdatedTotal(0);
    setAlertMessageError(false);
  };

  useEffect(() => {
    listProducts(setProducts);
    orderTotal();
  }, [orderTotal]);

  return (
    <div>
      <Header />
      <h1 className="text-center text-2xl md:text-5xl mb-10">
        Cadastro de Pedidos
      </h1>
      <div>
        <Snackbar
          open={showAlertError}
          autoHideDuration={4000}
          onClose={() => setShowAlertError(false)}
        >
          <Alert severity="error">{alertMessageError}</Alert>
        </Snackbar>
        <Snackbar
          open={showAlertSuccess}
          autoHideDuration={4000}
          onClose={() => setShowAlertSuccess(false)}
        >
          <Alert severity="success">Pedido criado com sucesso.</Alert>
        </Snackbar>
        <form>
          <div className="flex justify-center">
            <div className="flex w-2/3">
              <span className="flex flex-col mr-2 w-1/2 md:w-4/6">
                <span className="text-xs md:text-base">Nome do cliente</span>
                <TextField
                  name="customerName"
                  value={form.customerName}
                  onChange={onChange}
                />
              </span>
              <span className="flex flex-col w-1/2 md:w-1/4">
                <span className="text-xs md:text-base">Data de entrega</span>
                <TextField
                  name="deliveryDate"
                  type="date"
                  value={form.deliveryDate}
                  onChange={onChange}
                />
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex items-end w-2/3">
              <span className="flex flex-col mr-2 w-4/6">
                <span className="text-xs md:text-base">
                  Adicionar produtos:
                </span>
                <Autocomplete
                  onChange={(event, newValue) => {
                    setSelected(newValue);
                  }}
                  value={selected.name}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option) => (
                    <p {...props}>
                      {option.name}
                      <br></br> Estoque:{option.quantityStock}
                    </p>
                  )}
                  options={products}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </span>
              <span className="flex flex-col w-2/6">
                <span className="text-xs md:text-base">Quantidade:</span>
                <TextField value={quantity} onChange={onChangeQuantity} />
              </span>
              <span className="w-1/6">
                <CustomButton
                  onClickFunction={onClickAddProduct}
                  buttonName="Adicionar"
                />
              </span>
            </div>
          </div>
        </form>
        <div className="flex flex-col items-center">
          <div className="w-2/3">
            <h2 className="text-base md:text-2xl mt-10 mb-5">
              Produtos do pedido
            </h2>
            <table className="w-full md:text-base text-sm">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço por unidade</th>
                  <th>Quantidade</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-center">{listAddedProducts}</tbody>
            </table>
            <h3 className="text-base md:text-2xl mt-5 text-center">
              Total:{" "}
              {updatedTotal.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </h3>
            <div className="my-6 flex justify-evenly">
              <CustomButton
                onClickFunction={createOrder}
                buttonName="Criar pedido"
              />
              <CustomButton
                onClickFunction={clearOrder}
                buttonName="Limpar formulário"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
