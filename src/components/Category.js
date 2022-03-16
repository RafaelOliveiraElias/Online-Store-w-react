import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Category extends Component {
  select = () => {
    const { categoryId, searchCategory } = this.props;
    if (categoryId === searchCategory) {
      return true;
    }
    return false;
  }

  render() {
    const { categoryId, categoryName, categorySelect } = this.props;
    return (
      <div>
        <label
          className="rad-label"
          htmlFor={ categoryId }
          data-testid="category"
        >
          <input
            type="radio"
            id={ categoryId }
            className="rad-input"
            value={ categoryId }
            onChange={ categorySelect }
            name="category"
            checked={
              this.select()
            }
          />
          <div className="rad-design" />
          <div className="rad-text">
            {
              categoryName
            }
          </div>
        </label>
      </div>
    );
  }
}

Category.propTypes = {
  categoryId: PropTypes.string,
  categoryName: PropTypes.string,
}.isRequired;
