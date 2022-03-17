import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { BiCartAlt } from 'react-icons/bi';
import { MdOutlineLocalShipping } from 'react-icons/md';
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

  priceGenerator = () => {
    const { productInfo: { price } } = this.props;
    const valor = price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    const arr = valor.split(',');
    return (
      <div className="allValue">
        <span className="inter">
          {arr[0]}
        </span>
        <span className="cents">{ arr[1] }</span>
      </div>);
  }

  render() {
    const { productInfo, addProduct } = this.props;
    const { title, thumbnail, id, shipping } = productInfo;
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
            <p>{this.priceGenerator()}</p>
            { Object.values(shipping)[0]
              ? (
                <div className="shipping">
                  <h5 data-testid="free-shipping">Frete grátis</h5>
                  <MdOutlineLocalShipping size="25px" />
                </div>) : null }
          </div>
        </div>
        <button
          type="button"
          className="myButton"
          data-testid="product-add-to-cart"
          onClick={ () => { addProduct(productInfo); } }
        >
          Adicione ao Carrinho
          <br />
          <BiCartAlt size="25px" border="circle" className="cartIcon" />
        </button>
      </div>
    );
  }
}

Product.propTypes = {
  productInfo: PropTypes.instanceOf(Object).isRequired,
  addProduct: PropTypes.func.isRequired,
};
