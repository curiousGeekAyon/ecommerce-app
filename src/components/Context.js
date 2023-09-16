import React from "react";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from "react";
import { pageReducer, cartReducer, singleProductReducer } from "./Reducer";
import { getNativeSelectUtilityClasses } from "@mui/material";

const Items = createContext();

function Context({ children }) {
  const [pageState, pageDispatch] = useReducer(pageReducer, {
    data: [],
    currPData: [],
    currCategory: "All products",
    sort: [
      { check: false, highToLow: 0 },
      { check: false, highToLow: 0 },
      { check: false, highToLow: 0 },
    ],
    totalSearchData: [],
    currPSearchData: [],
    categories: [],
    serachKeyWord: "",
    total: 0,
    page: 0,
    sPage: 0,
    sTotal: 0,
  });

  const [cartState, cartDispatch] = useReducer(cartReducer, {
    cart: new Map(),
    cost: 0,
  });

  const [singleProductState, singleProductDispatch] = useReducer(
    singleProductReducer,
    {
      item: {},
      id: "",
    }
  );
  const [singleData, setSingleData] = useState({});

  const contextValue = {
    pageState,
    pageDispatch,
    cartState,
    cartDispatch,
    singleProductState,
    singleProductDispatch,
    singleData,
    setSingleData,
  };

  useEffect(() => {
    if (pageState.currCategory === "All products") {
      fetch(`https://dummyjson.com/products?limit=100&skip=0`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          pageDispatch({
            type: "SET_DATA",
            payload: {
              data: data.products,
              total: data.total,
              currPData: data.products.slice(0, 12),
            },
          });
        });
    } else {
      fetch(`https://dummyjson.com/products/category/${pageState.currCategory}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          pageDispatch({
            type: "SET_DATA",
            payload: {
              data: data.products,
              total: data.total,
              currPData: data.products.slice(0, 12),
            },
          });
        });
    }
    if (pageState.categories.length === 0) {
      fetch(`https://dummyjson.com/products/categories`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const updatedCategories = ["All products", ...data];
          pageDispatch({
            type: "UPDATE_CATEGORIES",
            payload: updatedCategories,
          });
        })
        .catch((error) => {
        });
    }
  }, [pageState.currCategory]);

  useEffect(() => {
    if (pageState.searchKeyWord !== null) {
      fetch(
        `https://dummyjson.com/products/search?q=${pageState.searchKeyWord}`
      )
        .then((response) => response.json())
        .then((data) => {
          pageDispatch({
            type: "SET_SEARCH_PAGE",
            payload: {
              totalSearchData: data.products,
              currPSearchData: data.products.slice(pageState.sPage * 12, 12),
              sTotal: data.total,
            },
          });
        });
    }
  }, [pageState.searchKeyWord]);

  return <Items.Provider value={contextValue}>{children}</Items.Provider>;
}

export const useItemState = () => {
  return useContext(Items);
};

export default Context;
