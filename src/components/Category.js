import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Category extends Component {
  render() {
    const { categoryId, categoryName } = this.props;
    return (
      <div>
        <label htmlFor={ categoryId } data-testid="category">
          <input
            type="radio"
            id={ categoryId }
            value={ categoryId }
            name="category"
          />
          {
            categoryName
          }
        </label>
      </div>
    );
  }
}

Category.propTypes = {
  categoryId: PropTypes.string,
  categoryName: PropTypes.string,
}.isRequired;
