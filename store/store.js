import { messagesReducer, counterReducer } from "./reducer.js";
import { createStore, combineReducers } from "../lib/xState/index.js";
import { initCountState, initMessages } from "./state.js";

const rootReducer = combineReducers({
  counter: counterReducer,
  messages: messagesReducer,
});

const store = createStore(rootReducer, {
  counter: initCountState,
  messages: initMessages,
});

export { store };

function createCartService() {
  let cart = [];

  function addToCart(item) {
    cart.push(item);
  }

  function getCart() {
    return cart;
  }

  return {
    addToCart,
    getCart
  };
}

const cartService = createCartService();
cartService.addToCart('Apple');
console.log(cartService.getCart()); // ['Apple']