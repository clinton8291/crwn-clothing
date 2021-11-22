import { createSelector } from "reselect";

//Create an Input Selector for the cart
const selectCart = (state) => state.cart;

//Create an Output Selector
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumalatorQty, cartItem) => accumalatorQty + cartItem.quantity,
      0
    )
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectTotalPrice = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumalatorPrice, cartItem) =>
      accumalatorPrice + cartItem.quantity * cartItem.price,
    0
  )
);
