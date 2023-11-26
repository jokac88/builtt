import {createStore} from 'redux';

const initialValue = {products: [], cart: [], isLogged: false};
const rootReducer = (state = initialValue, action) => {
  const actionHandlers = {
    SET_PRODUCTS: () => ({
      ...state,
      products: action.products,
    }),
    // SET_PRODUCT_QUANTITY: () => ({
    //   ...state,
    //   products: state.products.map((product) => product.id === action.id ? {
    //     ...product,
    //     quantity: action.quantity
    //   } : product)
    // }),
    // INCREASE_PRODUCT_QUANTITY: () => ({
    //   ...state,
    //   products: state.products.map((product) => product.id === action.id ? {
    //     ...product,
    //     quantity: product.quantity + 1
    //   } : product)
    // }),
    // DECREASE_PRODUCT_QUANTITY: () => ({
    //   ...state,
    //   products: state.products.map((product) => product.id === action.id ? {
    //     ...product,
    //     quantity: product.quantity - 1
    //   } : product)
    // }),
    ADD_TO_CART: () => ({
      ...state,
      cart: [...state.cart, action.product]
    }),
    UPDATE_CART: () => ({
      ...state,
      cart: state.cart.map((product) => product.id === action.product.id ? action.product : product)
    }),
    REMOVE_FROM_CART: () => ({
      ...state,
      cart: state.cart.filter(product => product.id !== action.id)
    }),
    AUTHENTICATION: () => ({
      ...state,
      isLogged: true
    }),
  };

  const handler = actionHandlers[action.type] || (() => state);

  return handler();
}

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
