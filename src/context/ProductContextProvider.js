import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { API } from "../helpers/const";
import { useNavigate } from "react-router-dom";
const productContext = createContext();
export const useProducts = () => useContext(productContext);
const INIT_STATE = {
  products: [],
  oneProduct: {},
  categories: [],
  pages: 18,
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_ONE_PRODUCT":
      return { ...state, oneProduct: action.payload };
  }
};
const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const navigate = useNavigate();
  //! CONFIG

  const getConfig = () => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    const Authorization = `Bearer ${tokens.access.access}`;
    const config = {
      headers: { Authorization },
    };
    return config;
  };
  console.log(getConfig());
  const getCategories = async () => {
    const { data } = await axios(`${API}/category/list/`, getConfig());
    dispatch({
      type: "GET_CATEGORIES",
      payload: data.results,
    });
  };
  //! GET
  const getProducts = async () => {
    try {
      const { data } = await axios(
        `${API}/products/${window.location.search}`,
        getConfig()
      );
      dispatch({
        type: "GET_PRODUCTS",
        payload: data.results,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //! CREATE
  const createProduct = async (newProduct) => {
    try {
      await axios.post(`${API}/products/`, newProduct, getConfig());
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };
  //! DELETE
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/products/${id}/`, getConfig());
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };
  //! GET_ONE_PRODUCT
  const getOneProduct = async (id) => {
    try {
      const { data } = await axios(`${API}/products/${id}/`, getConfig());
      console.log(data);
      dispatch({
        type: "GET_ONE_PRODUCT",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //! EDIT
  const editProduct = async (id, newProduct) => {
    try {
      await axios.patch(`${API}/products/${id}/`, newProduct, getConfig());
      navigate("/products");
    } catch (error) {}
  };
  const values = {
    getCategories,
    getProducts,
    products: state.products,
    categories: state.categories,
    createProduct,
    pages: state.pages,
    deleteProduct,
    getOneProduct,
    oneProduct: state.oneProduct,
    editProduct,
  };
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
