import React from "react";
import { Link } from "react-router-dom";

import "./header.component.scss";

import { auth } from "../../firebase/firebase.utils";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import { connect } from "react-redux";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";

import { selectCartHidden } from "../../redux/cart/cart.selectors";

const Header = ({ currentUser, hidden }) => {
  return (
    <div className='header'>
      <Link className='logo-container' to='/'>
        <Logo className='logo' />
      </Link>
      <div className='options'>
        <Link className='option' to='/shop'>
          SHOP
        </Link>
        {currentUser ? (
          <div className='option' onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className='option' to='/signin'>
            SIGNIN
          </Link>
        )}
        <Link className='option' to='/contact'>
          CONTACT
        </Link>
        <CartIcon />
      </div>
      {hidden ? null : <CartDropdown />}
    </div>
  );
};

/*const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden,
});*/

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
