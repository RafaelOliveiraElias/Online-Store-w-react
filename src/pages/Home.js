import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Categories from '../components/Categories';
import Products from '../components/Products';
import * as api from '../services/api';

export default class Home extends Component {
  constructor() {
    super();
    this.state = ({
      searchQuery: '',
      productsInfos: [],
      searchCategory: '',
      orderOfProducts: 'relevance',
    });
  }

  handleChange = ({ target }) => {
    this.setState({
      searchQuery: target.value,
    });
  };

  handleClick = async () => {
    const { searchQuery } = this.state;
    let { orderOfProducts } = this.state;
    orderOfProducts = `&sort=${orderOfProducts}`;
    const data = await api.getProductsFromQuery(searchQuery + orderOfProducts);
    this.setState({ productsInfos: data.results });
  }

  handleOrderOfProducts = ({ target }) => {
    const { value } = target;
    this.setState({ orderOfProducts: value });
  }

  categorySelect = async ({ target }) => {
    const valueTarget = target.value;
    this.setState({
      searchCategory: valueTarget,
    });
    let { orderOfProducts } = this.state;
    orderOfProducts = `&sort=${orderOfProducts}`;

    const { searchQuery } = this.state;
    const search = await api
      .getProductsFromCategoryAndQuery(valueTarget, searchQuery + orderOfProducts);

    this.setState({ productsInfos: search.results });
  };

  render() {
    const { searchQuery, productsInfos, searchCategory, orderOfProducts } = this.state;
    const { addProduct } = this.props;
    return (
      <>
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
              placeholder="Buscar"
            />
          </label>
          <label htmlFor="orderOfProducts">
            {'Ordenar por '}
            <select
              name="orderOfProducts"
              value={ orderOfProducts }
              id="orderOfProducts"
              onChange={ this.handleOrderOfProducts }
            >
              <option value="relevance">Mais Relevante</option>
              <option value="price_desc">Preço: Maior para Menor</option>
              <option value="price_asc">Preço: Menor para Maior</option>
            </select>
          </label>
          <button
            type="submit"
            onClick={ this.handleClick }
            data-testid="query-button"
          >
            Atualizar
          </button>
        </form>

        <Categories
          categorySelect={ this.categorySelect }
          searchCategory={ searchCategory }
        />
        <Products
          { ...this.props }
          productsInfos={ productsInfos }
          addProduct={ addProduct }
        />
      </>
    );
  }
}

Home.propTypes = {
  addProduct: PropTypes.func.isRequired,
};
