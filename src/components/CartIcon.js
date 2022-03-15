import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { BiCartAlt } from 'react-icons/bi';
import './CartIcon.css';

class CartIcon extends React.Component {
  render() {
    const { cartItems } = this.props;
    const { cartTotalItems } = cartItems;
    return (
      <div className="shopping-cart">
        <Link to="/cart" data-testid="shopping-cart-button">
          <BiCartAlt size="50px" border="circle" className="cartIcon" />
          <div className="cartNumber">
            <span
              data-testid="shopping-cart-size"
            >
              {cartTotalItems}
            </span>
          </div>
        </Link>
      </div>
    );
  }
}

CartIcon.propTypes = {
  cartItems: PropTypes.shape({
    cartTotalItems: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartIcon;
