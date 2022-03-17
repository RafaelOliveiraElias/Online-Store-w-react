import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Categories from '../components/Categories';
import LoaderSpinner from '../components/LoaderSpinner';
import Products from '../components/Products';
import './home.css';

export default class Home extends Component {
  render() {
    const { searchCategory,
      productsInfos,
      loading,
      categorySelect, addProduct } = this.props;
    return (
      <div className="homeClass">
        <Categories
          categorySelect={ categorySelect }
          searchCategory={ searchCategory }
        />
        {loading ? (
          <div className="loading margin">
            <p>Carregando...</p>
            <LoaderSpinner />
          </div>)
          : (
            <Products
              { ...this.props }
              productsInfos={ productsInfos }
              addProduct={ addProduct }
            />) }
      </div>
    );
  }
}

Home.propTypes = {
  addProduct: PropTypes.func.isRequired,
  cartItems: PropTypes.shape({}).isRequired,
  handleClick: PropTypes.func.isRequired,
  productsInfos: PropTypes.arrayOf(PropTypes.object).isRequired,
  searched: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  handleOrderOfProducts: PropTypes.func.isRequired,
  orderOfProducts: PropTypes.string.isRequired,
  categorySelect: PropTypes.func.isRequired,
  searchCategory: PropTypes.string.isRequired,
};
