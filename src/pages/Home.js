import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import cartIcon from '../icons/outline_shopping_cart_black_18dp.png';

export default class Home extends Component {
  render() {
    return (
      <>
        <Link to="/cart" data-testid="shopping-cart-button">
          <img
            src={ cartIcon }
            alt="Icone do carrinho de compras"
          />
        </Link>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Categories />
      </>
    );
  }
}
