import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Categories from '../components/Categories';
import Products from '../components/Products';

export default class Home extends Component {
  render() {
    const { searchQuery,
      searchCategory,
      productsInfos,
      loading,
      handleChange, handleClick, categorySelect, addProduct } = this.props;
    return (
      <>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <form onSubmit={ (e) => e.preventDefault() }>
          <label htmlFor="query-input">
            <input
              onChange={ handleChange }
              type="text"
              data-testid="query-input"
              id="query-input"
              value={ searchQuery }
            />
          </label>
          <button
            type="submit"
            onClick={ handleClick }
            data-testid="query-button"
          >
            Atualizar
          </button>
        </form>

        <Categories
          categorySelect={ categorySelect }
          searchCategory={ searchCategory }
        />
        {loading ? (<p>Carregando...</p>) : <Products
          { ...this.props }
          productsInfos={ productsInfos }
          addProduct={ addProduct }
        /> }
      </>
    );
  }
}

Home.propTypes = {
  addProduct: PropTypes.func.isRequired,
};
