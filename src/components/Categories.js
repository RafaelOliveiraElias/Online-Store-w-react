import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import Category from './Category';

export default class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    const data = await api.getCategories();
    this.setState({ categories: data });
  }

  render() {
    const { categories } = this.state;
    const { categorySelect, searchCategory } = this.props;
    return (
      <aside className="categoryAside">
        <h2 className="titleCat">Categorias: </h2>
        {
          categories.map((element) => (

            <Category
              categoryId={ element.id }
              categoryName={ element.name }
              key={ element.id }
              categorySelect={ categorySelect }
              searchCategory={ searchCategory }
            />
          ))
        }
      </aside>
    );
  }
}

Categories.propTypes = {
  categorySelect: PropTypes.func,
  searchCategory: PropTypes.string,
}.isRequired;
