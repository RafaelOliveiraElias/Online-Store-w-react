import PropTypes from 'prop-types';
import React from 'react';
import CartItem from '../components/CartItem';

export default class Cart extends React.Component {
  render() {
    const {
      cartItems,
      removeProduct,
      increaseProductQuantity,
      decreaseProductQuantity,
      clearCart,
    } = this.props;

    const { items, cartTotalPrice } = cartItems;

    if (items.length === 0) {
      return (
        <main>
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        </main>
      );
    }
    return (
      <main>
        <ul>
          {
            items.map((product) => {
              const { product: { id } } = product;
              return (
                <CartItem
                  product={ product }
                  key={ id }
                  removeProduct={ removeProduct }
                  increaseProductQuantity={ increaseProductQuantity }
                  decreaseProductQuantity={ decreaseProductQuantity }
                />
              );
            })
          }
        </ul>
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
        <p>{`R$ ${cartTotalPrice}`}</p>
      </main>
    );
  }
}

Cart.propTypes = {
  cartItems: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    cartTotalPrice: PropTypes.number.isRequired,
  }).isRequired,
  removeProduct: PropTypes.func.isRequired,
  increaseProductQuantity: PropTypes.func.isRequired,
  decreaseProductQuantity: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
};
