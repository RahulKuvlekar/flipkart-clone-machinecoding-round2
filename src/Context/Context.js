import React from "react";
import { createContext } from "react";
import { CartReducer } from "./CartReducer";
import { SaveCartReducer } from "./SaveCartReducer";
export const Context = createContext({
  cart: [],
  saveForLater: [],
  dispatchCart: () => Promise,
  dispatchSaveForLater: () => Promise,
});

const ContextProvider = (props) => {
  const [cart, dispatchCart] = React.useReducer(CartReducer, []);
  const [saveForLater, dispatchSaveForLater] = React.useReducer(
    SaveCartReducer,
    []
  );
  //   const [saveLater, dispatchSaveLater] = React.useReducer(cartReducer, []);
  let DEFAULT_VALUE = {
    cart: cart,
    saveForLater: saveForLater,
    dispatchCart: dispatchCart,
    dispatchSaveForLater: dispatchSaveForLater,
  };

  return (
    <Context.Provider value={DEFAULT_VALUE}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
