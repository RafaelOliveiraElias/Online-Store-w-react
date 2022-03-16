import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Categories from '../components/Categories';
import Products from '../components/Products';

export default class Home extends Component {
  render() {
    const { searchCategory,
      productsInfos,
      loading,
      categorySelect, addProduct } = this.props;
    return (
      <>
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
