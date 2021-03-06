import PropTypes from 'prop-types';
import React from 'react';
import CartIcon from './CartIcon';
import LogoIcon from './LogoIcon';
import './header.css';
import SearchHeader from './SearchHeader';

class Header extends React.Component {
  render() {
    const { handleChange,
      handleClick,
      orderOfProducts,
      searchQuery,
      handleOrderOfProducts,
      handleChecked,
      checkedCard,
      productsInfos, searched, categorySelect, searchCategory, cartItems } = this.props;
    return (
      <header>
        <LogoIcon />
        <SearchHeader
          searched={ searched }
          cartItems={ cartItems }
          searchQuery={ searchQuery }
          searchCategory={ searchCategory }
          productsInfos={ productsInfos }
          handleChange={ handleChange }
          handleClick={ handleClick }
          categorySelect={ categorySelect }
          handleOrderOfProducts={ handleOrderOfProducts }
          orderOfProducts={ orderOfProducts }
        />
        <CartIcon
          cartItems={ cartItems }
          handleChecked={ handleChecked }
          checkedCard={ checkedCard }
        />
      </header>
    );
  }
}

Header.propTypes = {
  cartItems: PropTypes.shape({}).isRequired,
  searchQuery: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  productsInfos: PropTypes.arrayOf(PropTypes.object).isRequired,
  searched: PropTypes.bool.isRequired,
  handleChecked: PropTypes.func.isRequired,
  handleOrderOfProducts: PropTypes.func.isRequired,
  orderOfProducts: PropTypes.string.isRequired,
  categorySelect: PropTypes.func.isRequired,
  searchCategory: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Header;
