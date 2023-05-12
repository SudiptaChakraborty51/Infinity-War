import { createContext, useReducer } from "react";
import { data } from "../App";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const allFilterReducer = (state, action) => {
    switch (action.type) {
      case "SEARCH":
        return {
          ...state,
          search: action.payload
        };
      case "SORT":
        return {
          ...state,
          sort: action.payload
        };
      case "FILTERS":
        return {
          ...state,
          filters: state?.filters.includes(action.payload)
            ? state?.filters?.filter((filter) => filter !== action.payload)
            : [...state?.filters, action.payload]
        };
      case "SELECT_IDEAL_FOR":
        return {
          ...state,
          idealFor: action.payload
        };
      case "SELECT_LEVEL":
        return {
          ...state,
          level: action.payload
        };
      default:
        return state;
    }
  };

  const initial = {
    search: "",
    sort: "",
    filters: ["inStock"],
    idealFor: "",
    level: ""
  };

  const [state, dispatch] = useReducer(allFilterReducer, initial);

  const searchFilteredProducts =
    state?.search?.length > 0
      ? data?.filter(({ name }) =>
          name.toLowerCase().includes(state?.search.toLowerCase())
        )
      : data;

  const sortFilteredProducts =
    state?.sort?.length > 0
      ? (() => {
          switch (state.sort) {
            case "LTH":
              return [...searchFilteredProducts]?.sort(
                (product1, product2) => product1.price - product2.price
              );
            case "HTL":
              return [...searchFilteredProducts]?.sort(
                (product1, product2) => product2.price - product1.price
              );
            case "RESET":
              return searchFilteredProducts;
            default:
              return searchFilteredProducts;
          }
        })()
      : searchFilteredProducts;

  const checkBoxFilteredProducts =
    state?.filters?.length > 0
      ? sortFilteredProducts.filter((product) =>
          state?.filters?.every((filter) => product[filter])
        )
      : sortFilteredProducts;

  const selectIdealForFilteredProducts =
    state?.idealFor?.length > 0
      ? checkBoxFilteredProducts?.filter(
          ({ idealFor }) => idealFor === state.idealFor
        )
      : checkBoxFilteredProducts;

  const selectLevelFilteredProducts =
    state?.level?.length > 0
      ? selectIdealForFilteredProducts?.filter(
          ({ level }) => level === state.level
        )
      : selectIdealForFilteredProducts;

  return (
    <ProductContext.Provider
      value={{ state, dispatch, selectLevelFilteredProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};
