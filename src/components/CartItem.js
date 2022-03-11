import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartItem extends Component {
  render() {
    const { title, total } = this.props;
    return (
      <>
        <p data-testid="shopping-cart-product-name">
          { title }
        </p>
        <p data-testid="shopping-cart-product-quantity">
          { total }
        </p>
      </>
    );
  }
}

CartItem.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default CartItem;
