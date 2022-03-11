import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import Products from '../components/Products';
import * as api from '../services/api';
import cartIcon from '../icons/outline_shopping_cart_black_18dp.png';

export default class Home extends Component {
  constructor() {
    super();
    this.state = ({
      searchQuery: '',
      productsInfos: [],
    });
  }

  handleChange = ({ target }) => {
    this.setState({
      searchQuery: target.value,
    });
  };

  handleClick = async () => {
    const { searchQuery } = this.state;
    const data = await api.getProductsFromQuery(searchQuery);
    this.setState({ productsInfos: data.results });
  }

  render() {
    const { searchQuery, productsInfos } = this.state;
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
        <form onSubmit={ (e) => e.preventDefault() }>
          <label htmlFor="query-input">
            <input
              onChange={ this.handleChange }
              type="text"
              data-testid="query-input"
              id="query-input"
              value={ searchQuery }
            />
          </label>
          <button
            type="submit"
            onClick={ this.handleClick }
            data-testid="query-button"
          >
            Atualizar
          </button>
        </form>

        <Categories />
        <Products productsInfos={ productsInfos } />
      </>
    );
  }
}
