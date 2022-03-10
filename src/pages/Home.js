import React, { Component } from 'react';
import Categories from '../components/Categories';

export default class Home extends Component {
  render() {
    return (
      <>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Categories />
      </>
    );
  }
}
