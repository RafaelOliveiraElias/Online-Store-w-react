import PropTypes from 'prop-types';
import React from 'react';
import Rates from '../components/Rates';
import * as api from '../services/api';

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

  renderDecreaseButton = (item) => {
    const { decreaseProductQuantity } = this.props;
    return (
      <button
        data-testid="product-decrease-quantity"
        type="button"
        onClick={ () => {
          decreaseProductQuantity(item);
        } }
      >
        -
      </button>
    );
  };

  renderIncreaseButton = (item, total) => {
    const { increaseProductQuantity } = this.props;
    return (
      <button
        data-testid="product-increase-quantity"
        type="button"
        onClick={ () => {
          increaseProductQuantity(item);
        } }
        disabled={ total >= item.available_quantity }
      >
        +
      </button>
    );
  };

  render() {
    const { loading, data } = this.state;
    const { addProduct, getProductInTheCart } = this.props;
    const productInTheCart = getProductInTheCart(data.id);
    if (loading) {
      return (
        <h2>loading...</h2>
      );
    }
    return (
      <div>
        <h2 data-testid="product-detail-name">{data.title}</h2>
        <p>{data.price}</p>
        <img src={ data.thumbnail } alt={ data.title } />
        {
          productInTheCart
            ? (
              <>
                {this.renderDecreaseButton(data)}
                <span>{productInTheCart.total}</span>
                {this.renderIncreaseButton(data)}
              </>
            )
            : (
              <button
                type="button"
                data-testid="product-detail-add-to-cart"
                onClick={ () => { addProduct(data); } }
              >
                Adicione ao Carrinho
              </button>
            )
        }
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
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  addProduct: PropTypes.func.isRequired,
  getProductInTheCart: PropTypes.func.isRequired,
  increaseProductQuantity: PropTypes.func.isRequired,
  decreaseProductQuantity: PropTypes.func.isRequired,
};
