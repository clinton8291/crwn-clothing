import React from "react";

import "./checkout-item.styles.scss";

import { connect } from "react-redux";

import { clearCartItem, removeItem, addItem } from "../../redux/cart/cart.actions";

const CheckoutItem = ({ item, removeItem, addItem, clearCartItem }) => {
  const { name, price, quantity, imageUrl } = item;
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={imageUrl} alt='item' />
      </div>
      <div className='name'>{name}</div>
      <div className='quantity'>
        <span className="arrow" onClick={() => removeItem(item)}>&#10094;</span>
        <span className="value">{quantity}</span>
        <span className="arrow" onClick={() => addItem(item)}>&#10095;</span>
      </div>
      <div className='price'>{price}</div>
      <div className='remove-button' onClick={() => clearCartItem(item)}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearCartItem: (item) => dispatch(clearCartItem(item)),
  addItem: (item) =>  dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
