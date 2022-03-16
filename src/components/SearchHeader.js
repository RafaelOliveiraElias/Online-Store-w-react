import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class SearchHeader extends React.Component {
  render() {
    const { handleChange,
      handleClick, orderOfProducts,
      searchQuery, handleOrderOfProducts } = this.props;
    return (
      <div className="searchHeader">
        <input
          onChange={ handleChange }
          type="text"
          id="query-input2"
          className="searchQueryInput"
          value={ searchQuery }
        />
        <select
          name="orderOfProducts"
          value={ orderOfProducts }
          id="orderOfProducts"
          onChange={ handleOrderOfProducts }
        >
          <option value="relevance">Mais Relevante</option>
          <option value="price_desc">Preço: Maior para Menor</option>
          <option value="price_asc">Preço: Menor para Maior</option>
        </select>
        <Link to="/">
          <button
            type="button"
            onClick={ handleClick }
          >
            Pesquisar
          </button>
        </Link>
      </div>
    );
  }
}

SearchHeader.propTypes = {
  cartItems: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  handleOrderOfProducts: PropTypes.func.isRequired,
  orderOfProducts: PropTypes.string.isRequired,
};
