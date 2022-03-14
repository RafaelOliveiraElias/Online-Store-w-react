import PropTypes from 'prop-types';
import React, { Component } from 'react';

class CartItem extends Component {
  renderRemoveButton = (item) => {
    const { removeProduct } = this.props;
    return (
      <button
        type="button"
        onClick={ () => {
          removeProduct(item);
        } }
      >
        X
      </button>
    );
  };

  renderDecreaseButton = (item) => {
    const { decreaseProductQuantity } = this.props;
    return (
      <button
        data-testid="product-decrease-quantity"
        type="button"
        onClick={ () => {
          decreaseProductQuantity(item);
        } }
      >
        -
      </button>
    );
  };

  renderIncreaseButton = (item, total) => {
    const { increaseProductQuantity } = this.props;
    return (
      <button
        data-testid="product-increase-quantity"
        type="button"
        onClick={ () => {
          increaseProductQuantity(item);
        } }
        disabled={ total >= item.available_quantity }
      >
        +
      </button>
    );
  };

  render() {
    const { product } = this.props;
    const { product: item, total, productTotalPrice } = product;
    const { title, thumbnail } = item;
    return (
      <li>
        {this.renderRemoveButton(item)}
        <img src={ thumbnail } alt={ title } />
        <span data-testid="shopping-cart-product-name">
          {title}
        </span>
        {this.renderDecreaseButton(item)}
        <span data-testid="shopping-cart-product-quantity">
          {total}
        </span>
        {this.renderIncreaseButton(item, total)}
        <span>
          {`R$ ${productTotalPrice}`}
        </span>
      </li>
    );
  }
}

CartItem.propTypes = {
  product: PropTypes.shape({
    product: PropTypes.shape({
      title: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
    }).isRequired,
    total: PropTypes.number.isRequired,
    productTotalPrice: PropTypes.number.isRequired,
  }).isRequired,
  removeProduct: PropTypes.func.isRequired,
  increaseProductQuantity: PropTypes.func.isRequired,
  decreaseProductQuantity: PropTypes.func.isRequired,
};

export default CartItem;
