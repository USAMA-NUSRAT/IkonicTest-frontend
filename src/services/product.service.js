import address from "../../env";
import axios from "axios";
const token = JSON.parse(localStorage.getItem("token"));
const url = `${address.API_URL}:${address.PORT}`;

const createProduct = (formData) => {
  return axios.post(`${url}/product/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};
const getProducts = () => {
  return axios.get(`${url}/product/find`);
};
const updateProduct = (id, product) => {
  return axios.put(`${url}/product/update/${id}`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteProduct = (id) => {
  return axios.delete(`${url}/product/delete/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
};
