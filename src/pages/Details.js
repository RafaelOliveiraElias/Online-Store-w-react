import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as api from '../services/api';

import cartIcon from '../icons/outline_shopping_cart_black_18dp.png';
import Rates from '../components/Rates';

export default class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.productDetails();
  }

    productDetails = async () => {
      const { match: { params: { id } } } = this.props;
      const data = await api.getProductDetais(id);
      this.setState({
        data,
        loading: false,
      });
    }

    render() {
      const { loading, data } = this.state;
      const { addProducts } = this.props;
      if (loading) {
        return (
          <h2>loading...</h2>
        );
      }
      return (
        <div>
          <Link to="/cart" data-testid="shopping-cart-button">
            <img
              src={ cartIcon }
              alt="Icone do carrinho de compras"
            />
          </Link>
          <h2 data-testid="product-detail-name">{data.title}</h2>
          <p>{data.price}</p>
          <img src={ data.thumbnail } alt={ data.title } />
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => { addProducts(data); } }
          >
            Adicione ao Carrinho
          </button>
          <div>
            <p>Especificações do Produto</p>
            {data.attributes.map((attribute) => (
              <div key={ attribute.id }>
                <p>{attribute.name}</p>
                <p>{attribute.value_name}</p>
              </div>
            ))}
          </div>
          <Rates />
        </div>
      );
    }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  addProducts: PropTypes.func.isRequired,
}.isRequired;
