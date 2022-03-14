import PropTypes from 'prop-types';
import React from 'react';

export default class Ending extends React.Component {
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
    return (
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
        <button type="submit" onClick={ onClick }>
          Finalizar Compra
        </button>
      </form>);
  }
}
