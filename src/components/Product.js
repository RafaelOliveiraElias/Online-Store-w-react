import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './product.css';

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
    const { productInfo, addProduct } = this.props;
    const { title, thumbnail, price, id, shipping } = productInfo;
    const { clicked } = this.state;
    if (clicked) {
      return <Redirect to={ `/product/${id}` } />;
    }
    return (
      <div data-testid="product" className="productClass">
        <div
          data-testid="product-detail-link"
          onClick={ this.cardClick }
          onKeyDown={ this.cardClick }
          // colocamos as propiedades role e tabIndex para concertar o link vide https://stackoverflow.com/questions/56441825/how-to-fix-button-interactive-role-must-be-focusable
          role="link"
          tabIndex={ 0 }
          className="linkDiv"
        >
          <div className="imgsContainer">
            <img src={ thumbnail } alt={ title } />
          </div>
          <div className="infos">
            <h4>{title}</h4>
            <p>{price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
            { Object.values(shipping)[0]
              ? <h4 data-testid="free-shipping">Frete grátis</h4> : null }
          </div>
          <button
            type="button"
            data-testid="product-add-to-cart"
            onClick={ () => { addProduct(productInfo); } }
          >
            Adicione ao Carrinho
          </button>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  productInfo: PropTypes.instanceOf(Object).isRequired,
  addProduct: PropTypes.func.isRequired,
};
