import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class SearchHeader extends React.Component {
  render() {
    const { handleChange,
      handleClick, searchQuery } = this.props;
    return (
      <div>
        <label htmlFor="query-input2">
          <input
            onChange={ handleChange }
            type="text"
            id="query-input2"
            value={ searchQuery }
          />
        </label>
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
};
