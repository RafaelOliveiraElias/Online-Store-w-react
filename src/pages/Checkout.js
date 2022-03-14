import PropTypes from 'prop-types';
import React from 'react';
import CartItem from '../components/CartItem';

export default class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      cpf: '',
      phone: '',
      postalCode: '',
      adress: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = (event) => {
    event.preventDefault();

    this.setState({
      name: '',
      email: '',
      cpf: '',
      phone: '',
      postalCode: '',
      adress: '',
    });
  };

  render() {
    const { name, email, cpf, phone, postalCode, adress } = this.state;
    const { cartItems, removeProduct,
      increaseProductQuantity,
      decreaseProductQuantity } = this.props;
    const { items } = cartItems;
    return (
      <>
        <ul>
          { items.length === 0
            ? (
              <div>
                <p>Seu carrinho está vazio</p>
              </div>)
            : (items.map((product) => {
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
            }))}
        </ul>
        <form>
          <h2>Comprador: </h2>
          <div>
            <input
              required
              name="name"
              type="text"
              data-testid="checkout-fullname"
              onChange={ this.handleChange }
              value={ name }
            />

            <input
              required
              name="email"
              type="email"
              data-testid="checkout-email"
              onChange={ this.handleChange }
              value={ email }
            />

            <input
              required
              name="cpf"
              type="text"
              data-testid="checkout-cpf"
              onChange={ this.handleChange }
              value={ cpf }
            />

            <input
              required
              name="phone"
              type="text"
              data-testid="checkout-phone"
              onChange={ this.handleChange }
              value={ phone }
            />

            <input
              required
              name="postalCode"
              type="text"
              data-testid="checkout-cep"
              onChange={ this.handleChange }
              value={ postalCode }
            />

            <input
              required
              name="adress"
              type="text"
              data-testid="checkout-address"
              onChange={ this.handleChange }
              value={ adress }
            />
          </div>
          <button
            type="submit"
          >
            Comprar
          </button>
        </form>
      </>);
  }
}

Checkout.propTypes = {
  cartItems: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    cartTotalPrice: PropTypes.number.isRequired,
  }).isRequired,
  removeProduct: PropTypes.func.isRequired,
  increaseProductQuantity: PropTypes.func.isRequired,
  decreaseProductQuantity: PropTypes.func.isRequired,
};
