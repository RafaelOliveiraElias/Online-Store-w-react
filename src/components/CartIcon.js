import PropTypes from 'prop-types';
import React from 'react';
// import { Link } from 'react-router-dom';
import { BiCartAlt } from 'react-icons/bi';
import './CartIcon.css';

class CartIcon extends React.Component {
  render() {
    const { cartItems, handleChecked, checkedCard } = this.props;
    const { cartTotalItems } = cartItems;
    return (
      <div className={ checkedCard ? 'shopping-cart arreda' : 'shopping-cart' }>
        <label htmlFor="cart-control">
          <BiCartAlt size="50px" border="circle" className="cartIcon" />
          <div className="cartNumber">
            <span
              data-testid="shopping-cart-size"
            >
              {cartTotalItems}
            </span>
          </div>
        </label>
        <input
          type="checkbox"
          id="cart-control"
          className="cart-control"
          onChange={ handleChecked }
        />
      </div>
    );
  }
}
/* <Link to="/cart" data-testid="shopping-cart-button"> */
CartIcon.propTypes = {
  cartItems: PropTypes.shape({
    cartTotalItems: PropTypes.number.isRequired,
  }).isRequired,
  handleChecked: PropTypes.func.isRequired,

};

export default CartIcon;
