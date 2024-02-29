import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { API } from "../helpers/const";
const productContext = createContext();
export const useProducts = () => useContext(productContext);
const INIT_STATE = {
  products: [],
  oneProduct: {},
  categories: [],
  pages: 25,
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
  }
};
const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
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
    await axios.post(`${API}/products/`, newProduct, getConfig());
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
  const values = {
    getCategories,
    getProducts,
    products: state.products,
    categories: state.categories,
    createProduct,
    pages: state.pages,
    deleteProduct,
  };
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
