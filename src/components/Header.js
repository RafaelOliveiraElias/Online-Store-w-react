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
      searchQuery,
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
        />
        <CartIcon cartItems={ cartItems } />
      </header>
    );
  }
}

Header.propTypes = {
  cartItems: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  productsInfos: PropTypes.arrayOf(PropTypes.object).isRequired,
  searched: PropTypes.bool.isRequired,
  categorySelect: PropTypes.func.isRequired,
  searchCategory: PropTypes.string.isRequired,
};

export default Header;
