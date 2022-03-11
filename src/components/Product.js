import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

export default class Product extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
  }

  cardClick = () => {
    this.setState({
      clicked: true,
    });
  }

  render() {
    const { productInfo } = this.props;
    const { productInfo: { title, thumbnail, price, id } } = this.props;
    const { addProducts } = this.props;
    const { clicked } = this.state;
    if (clicked) {
      return <Redirect to={ `/product/${id}` } />;
    }
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
