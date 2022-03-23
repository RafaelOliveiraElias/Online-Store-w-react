import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './CartItem.css';

class CartItem extends Component {
  renderRemoveButton = (item) => {
    const { removeProduct } = this.props;
    return (
      <button
        className="rmvBttn"
        type="button"
        onClick={ () => {
          removeProduct(item);
        } }
      >
        X
      </button>
    );
  };

  renderDecreaseButton = (item, total) => {
    const { decreaseProductQuantity } = this.props;
    return (
      <button
        data-testid="product-decrease-quantity"
        type="button"
        className="plusMinus"
        onClick={ () => {
          decreaseProductQuantity(item);
        } }
        disabled={ total === 1 }
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
        className="plusMinus"
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
      <li className="cartItems">
        <div className="imgContainter">
          <img src={ thumbnail } alt={ title } />
        </div>
        <span className="cartTitle" data-testid="shopping-cart-product-name">
          <a href={`http://localhost:3000/product/${item.id}`}>{title}</a>
        </span>
        <div className="buttons">
          {this.renderRemoveButton(item)}
          <div className="numbers">
            <span className="totalP">
              {productTotalPrice
                .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
            </span>
            <div className="controls">
              {this.renderDecreaseButton(item, total)}
              <span data-testid="shopping-cart-product-quantity">
                {total}
              </span>
              {this.renderIncreaseButton(item, total)}
            </div>
          </div>
        </div>
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
