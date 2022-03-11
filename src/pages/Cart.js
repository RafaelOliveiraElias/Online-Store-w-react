import React from 'react';
import PropTypes from 'prop-types';
import CartItem from '../components/CartItem';

export default class Cart extends React.Component {
  render() {
    const { products } = this.props;
    console.log(products);
    if (products.length === 0) {
      return (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      );
    }
    return products.map((product) => {
      const { product: { title, id }, total } = product;
      return <CartItem title={ title } key={ id } total={ total } />;
    });
  }
}

Cart.propTypes = {
  products: PropTypes.arrayOf().isRequired,
};
