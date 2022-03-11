import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Product extends Component {
  render() {
    const { productInfo } = this.props;
    const { productInfo: { title, thumbnail, price } } = this.props;
    const { addProducts } = this.props;
    return (
      <div data-testid="product">
        <h4>{ title }</h4>
        <p>{ price }</p>
        <img src={ thumbnail } alt={ title } />
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => { addProducts(productInfo); } }
        >
          Adicione ao Carrinho
        </button>
      </div>
    );
  }
}

Product.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
}.isRequired;
