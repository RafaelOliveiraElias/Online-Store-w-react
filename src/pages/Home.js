import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Categories from '../components/Categories';
import LoaderSpinner from '../components/LoaderSpinner';
import Products from '../components/Products';
import Cart from './Cart';
// import Cart from './Cart';
import './home.css';

export default class Home extends Component {
  // homeRender = () => (<Cart
  //   cartItems={ cartItems }
  //   removeProduct={ this.removeProduct }
  //   increaseProductQuantity={ this.increaseProductQuantity }
  //   decreaseProductQuantity={ this.decreaseProductQuantity }
  //   clearCart={ this.clearCart }
  // />)

  render() {
    const { searchCategory,
      productsInfos,
      loading, checkedCard,
      categorySelect,
      cartTotalPrice,
      removeProduct,
      cartItems,
      decreaseProductQuantity,
      increaseProductQuantity,
      clearCart,
      addProduct, searched } = this.props;
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
              searched={ searched }
              productsInfos={ productsInfos }
              addProduct={ addProduct }
            />) }
        <div
          className={ checkedCard ? 'arredaDiv cartAside' : 'cartAside' }
        >
          <Cart
            cartItems={ cartItems }
            cartTotalPrice={ cartTotalPrice }
            removeProduct={ removeProduct }
            increaseProductQuantity={ increaseProductQuantity }
            decreaseProductQuantity={ decreaseProductQuantity }
            clearCart={ clearCart }
          />
        </div>
        <div className={ checkedCard ? 'arredaDiv2 cover' : 'cover' } />
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
