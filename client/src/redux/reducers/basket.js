import { ADD_ITEM_TO_BASKET, UPDATED_ITEMS_IN_BASKET } from "../constants/basket";

const initialState = {itemsInBasket: []};


const reducer = (state = initialState, action) => {
  console.log("In the Basket Reducer", action.type);
  switch (action.type) {
    case ADD_ITEM_TO_BASKET:
      return {
        itemsInBasket: [...action.payload],
      };
    case UPDATED_ITEMS_IN_BASKET:
      return {
        itemsInBasket: [...action.payload],
      };
    
    default:
      return state;
  }
};
export default reducer;
