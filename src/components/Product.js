import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Product extends Component {
  cardClick = () => {
    const { productInfo: { id }, history } = this.props;
    history.push(`/product/${id}`);
  }

  render() {
    const { productInfo } = this.props;
    const { productInfo: { title, thumbnail, price } } = this.props;
    const { addProducts } = this.props;
    return (
      <div data-testid="product">
        <div
          data-testid="product-detail-link"
          onClick={ this.cardClick }
          onKeyDown={ this.cardClick }
          // colocamos as propiedades role e tabIndex para concertar o link vide https://stackoverflow.com/questions/56441825/how-to-fix-button-interactive-role-must-be-focusable
          role="link"
          tabIndex={ 0 }
        >
          <h4>{ title }</h4>
          <p>{ price }</p>
          <img src={ thumbnail } alt={ title } />
        </div>
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
