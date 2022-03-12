import PropTypes from 'prop-types';
import React, { Component } from 'react';

class CartItem extends Component {
  render() {
    const { product, addProducts, removeProducts } = this.props;
    const { product: item, total } = product;
    const { title } = item;
    return (
      <>
        <p data-testid="shopping-cart-product-name">
          {title}
        </p>
        <div>
          <button
            data-testid="product-decrease-quantity"
            type="button"
            onClick={ () => {
              removeProducts(item);
            } }
          >
            -
          </button>
          <p data-testid="shopping-cart-product-quantity">
            {total}
          </p>
          <button
            data-testid="product-increase-quantity"
            type="button"
            onClick={ () => {
              addProducts(item);
            } }
          >
            +
          </button>
        </div>
      </>
    );
  }
}

CartItem.propTypes = {
  product: PropTypes.shape({
    product: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  addProducts: PropTypes.func.isRequired,
  removeProducts: PropTypes.func.isRequired,
};

export default CartItem;
