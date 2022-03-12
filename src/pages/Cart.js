import PropTypes from 'prop-types';
import React from 'react';
import CartItem from '../components/CartItem';

export default class Cart extends React.Component {
  render() {
    const { products, addProducts, removeProducts, clearCart } = this.props;
    if (products.length === 0) {
      return (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      );
    }
    return (
      <>
        {
          products.map((product) => {
            const { product: { id } } = product;
            return (
              <CartItem
                product={ product }
                key={ id }
                addProducts={ addProducts }
                removeProducts={ removeProducts }
              />
            );
          })
        }
        <button
          type="button"
          onClick={ () => {
            clearCart();
          } }
        >
          Esvaziar carrinho
        </button>
        <button
          type="button"
        >
          Finalizar a compra
        </button>
      </>
    );
  }
}

Cart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  addProducts: PropTypes.func.isRequired,
  removeProducts: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
};
