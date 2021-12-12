export const CartReducer = (prevState, action) => {
  console.log("PREV ", prevState);
  console.log("ACTION ", action.payload);
  switch (action.type) {
    case "ADD_TO_CART":
      return [...prevState, { ...action.payload }];
    case "REMOVE_FROM_CART":
      return prevState.filter((data) => data.id !== action.payload);
    case "CHANGE_CART_QTY":
      return prevState.map((data) => {
        // console.log("if conditn ", data.id, action.id, data.id === action.id);
        if (data.id === action.payload.id) {
          data.quantity = Number(action.payload.quantity);
          //   console.log("quantity changed ", data.quantity);
        }
        // console.log("DATA UPDATED ", data);
        return data;
      });
    default:
      return prevState;
  }
};
