import PropTypes from 'prop-types';
import React from 'react';
import CartIcon from './CartIcon';

class Header extends React.Component {
  render() {
    const { cartItems } = this.props;
    return (
      <header><CartIcon cartItems={ cartItems } /></header>
    );
  }
}

Header.propTypes = {
  cartItems: PropTypes.shape({}).isRequired,
};

export default Header;
