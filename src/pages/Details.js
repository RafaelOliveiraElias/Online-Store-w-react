import PropTypes from 'prop-types';
import React from 'react';
import Rates from '../components/Rates';
import * as api from '../services/api';
import Cart from './Cart';
import './home.css';
import './details.css';

export default class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      select: 1,
      data: {},
      loading: true,
      desideredLength: 5,
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

  renderDecreaseButton = (item, total) => {
    const { decreaseProductQuantity, removeProduct } = this.props;
    return (
      <button
        data-testid="product-decrease-quantity"
        type="button"
        className="plsMns"
        onClick={ () => {
          if (total === 1) {
            removeProduct(item);
          } else {
            decreaseProductQuantity(item);
          }
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
        className="plsMns"
        disabled={ total >= item.available_quantity }
      >
        +
      </button>
    );
  };

  priceGenerator = () => {
    const { data } = this.state;
    const valor = data.price
      .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    const arr = valor.split(',');
    return (
      <div className="allValue">
        <span className="interSelect">
          {arr[0]}
        </span>
        <span className="centsSelect">{ arr[1] }</span>
      </div>);
  }

  hadleChange = (data, target) => {
    if (target.value < 6) {
      this.setState({
        select: target.value,
      });
    }
  }

  handleClick = async (data) => {
    const { addProduct } = this.props;
    const { select } = this.state;
    const arr = [];
    for (let index = 1; index <= select; index += 1) {
      arr.push(index);
      await addProduct(data);
    }
    console.log(select);
  }

  renderDropdownTest = (data) => {
    const { clicked } = this.state;
    let total = data.available_quantity;
    if (data.available_quantity < 5) {
      total = data.available_quantity;
    } else { total = 5; }
    const arr = [];
    for (let index = 0; index < total; index += 1) {
      arr.push(index + 1);
    }
    return (
      <select
        name="data"
        onChange={ ({ target }) => {
          this.hadleChange(data, target);
        } }
      >
        {arr.map((each) => (each === 1 ? <option value={ each } key={ each }>{`${each} unidade`}</option> : <option value={ each } key={ each }>{`${each} unidades`}</option>))}
      </select>);
  }

  render() {
    const { loading, data, desideredLength, select } = this.state;
    const { addProduct, getProductInTheCart, cartItems,
      cartTotalPrice, removeProduct, increaseProductQuantity,
      checkedCard,
      decreaseProductQuantity, clearCart } = this.props;
    const productInTheCart = getProductInTheCart(data.id);
    if (loading) {
      return (
        <h2>loading...</h2>
      );
    }
    return (
      <div className="detailsPage">
        <div className="productDetails">
          <div className="firstThing">
            <div className="imgContainer">
              <img src={ data.pictures[0].url } alt={ data.title } />
            </div>
            <div className="headerAside">
              <div>
                <h2 data-testid="product-detail-name">{data.title}</h2>
                <p>{this.priceGenerator()}</p>
              </div>
              <div className="buttonsHed">
                {
                  productInTheCart
                    ? (
                      <>
                        {this.renderIncreaseButton(data, productInTheCart.total)}
                        <span>{`No carrinho: ${productInTheCart.total}`}</span>
                        {this.renderDecreaseButton(data, productInTheCart.total)}
                      </>
                    )
                    : (
                      <>
                        {this.renderDropdownTest(data)}
                        <button
                          type="button"
                          data-testid="product-detail-add-to-cart"
                          className="addCrt"
                          onClick={ () => { this.handleClick(data); } }
                        >
                          Adicione ao Carrinho
                        </button>
                      </>
                    )
                }
              </div>
            </div>
          </div>
          <table id="customers">
            <tr>
              <th>Características do produto</th>
              <th />
            </tr>
            {data.attributes
              .map((attribute) => (
                <tr key={ attribute.id }>
                  <td>{attribute.name}</td>
                  <td>{attribute.value_name}</td>
                </tr>
              ))
              .filter((each, index) => (index < desideredLength ? each : null))}
          </table>
          <button className="more" onClick={() => { desideredLength === 5 ? this.setState({ desideredLength: data.attributes.length }): this.setState({ desideredLength: 5 })} } > { desideredLength === 5 ? 'Mais Características': 'Voltar' } </button>
          <Rates productId={ data.id } />
        </div>
        <div
          className={ checkedCard ? 'arredaDiv cartAside deta' : 'cartAside deta' }
        >
          <Cart
            cartItems={ cartItems }
            cartTotalPrice={ cartTotalPrice }
            removeProduct={ removeProduct }
            increaseProductQuantity={ increaseProductQuantity }
            decreaseProductQuantity={ decreaseProductQuantity }
            clearCart={ clearCart }
          />
        </div>
        <div className={ checkedCard ? 'arredaDiv2 cover deta1' : 'cover deta1' } />
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
