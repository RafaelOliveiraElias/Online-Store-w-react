import React from 'react';
import { Link } from 'react-router-dom';

export default class SearchHeader extends React.Component {
  render() {
    const { handleChange, handleClick, searchQuery, productsInfos, searched } = this.props;
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
