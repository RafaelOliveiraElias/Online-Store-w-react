import React, { Component } from 'react';
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
    return (
      <div>
        {
          categories.map((element) => (

            <Category
              categoryId={ element.id }
              categoryName={ element.name }
              key={ element.id }
            />
          ))
        }
      </div>
    );
  }
}
