import React from 'react';

export default class Cart extends React.Component {
  render() {
    return (
      <p data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </p>
    );
  }
}
