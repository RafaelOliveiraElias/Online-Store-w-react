import PropTypes from 'prop-types';
import React from 'react';
import CartIcon from './CartIcon';
import LogoIcon from './LogoIcon';
import './header.css';
import SearchHeader from './SearchHeader';

class Header extends React.Component {
  render() {
    const { handleChange, handleClick, searchQuery, productsInfos, searched, categorySelect, cartItems, searchCategory } = this.props;
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
};

export default Header;
