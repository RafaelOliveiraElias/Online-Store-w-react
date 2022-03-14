import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import cartIcon from '../icons/outline_shopping_cart_black_18dp.png';

class CartIcon extends React.Component {
  render() {
    const { cartItems } = this.props;
    const { cartTotalItems } = cartItems;
    return (
      <Link to="/cart" data-testid="shopping-cart-button">
        <img
          src={ cartIcon }
          alt="Icone do carrinho de compras"
        />
        <span data-testid="shopping-cart-size">{cartTotalItems}</span>
      </Link>
    );
  }
}

CartIcon.propTypes = {
  cartItems: PropTypes.shape({
    cartTotalItems: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartIcon;
