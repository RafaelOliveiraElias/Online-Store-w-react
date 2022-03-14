import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Details from './pages/Details';
import Home from './pages/Home';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: { items: [], cartTotalPrice: 0, cartTotalItems: 0 },
    };
  }

  componentDidMount() {
    this.setState({ cartItems: this.getCartInLocalStorage() });
  }

  getCartInLocalStorage = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItems) return cartItems;
    return { items: [], cartTotalPrice: 0, cartTotalItems: 0 };
  }

  saveCartInLocalStorage = () => {
    const { cartItems } = this.state;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  sum = (numA, numB, digits) => {
    const total = (numA + numB).toFixed(digits);
    return Number(total);
  }

  subtract = (numA, numB, digits) => {
    const difference = (numA - numB).toFixed(digits);
    return Number(difference);
  }

  addProduct = (product) => {
    const { cartItems } = this.state;
    const { items, cartTotalPrice, cartTotalItems } = cartItems;
    const itemInTheCart = items.some((cartItem) => {
      if (product.id === cartItem.product.id) return true;
      return false;
    });
    if (itemInTheCart) {
      this.increaseProductQuantity(product);
      return;
    }
    const { price } = product;
    this.setState({
      cartItems: {
        items: [...items, { product, total: 1, productTotalPrice: price }],
        cartTotalPrice: this.sum(cartTotalPrice, price, 2),
        cartTotalItems: cartTotalItems + 1,
      },
    }, this.saveCartInLocalStorage);
  }

  removeProduct = (product) => {
    const { cartItems } = this.state;
    const { cartTotalPrice, cartTotalItems } = cartItems;
    let { items } = cartItems;
    let productTotalPrice;
    let total;
    items = items.filter((item) => {
      if (product.id !== item.product.id) return true;
      productTotalPrice = item.productTotalPrice;
      total = item.total;
      return false;
    });
    this.setState({
      cartItems: {
        items,
        cartTotalPrice: this.subtract(cartTotalPrice, productTotalPrice, 2),
        cartTotalItems: cartTotalItems - total,
      },
    }, this.saveCartInLocalStorage);
  }

  increaseProductQuantity = (product) => {
    const { cartItems } = this.state;
    let { cartTotalPrice, cartTotalItems } = cartItems;
    const { items } = cartItems;
    const item = items.find((cartItem) => {
      if (product.id === cartItem.product.id) return true;
      return false;
    });
    if (item.total >= product.available_quantity) return;
    const { price } = product;
    item.total += 1;
    item.productTotalPrice = this.sum(item.productTotalPrice, price, 2);
    cartTotalItems += 1;
    cartTotalPrice = this.sum(cartTotalPrice, price, 2);
    this.setState({
      cartItems: {
        items,
        cartTotalPrice,
        cartTotalItems,
      },
    }, this.saveCartInLocalStorage);
  }

  decreaseProductQuantity = (product) => {
    const { cartItems } = this.state;
    let { cartTotalPrice, cartTotalItems } = cartItems;
    const { items } = cartItems;
    const item = items.find((cartItem) => {
      if (product.id === cartItem.product.id) return true;
      return false;
    });
    if ((item.total - 1) === 0) return;
    const { price } = product;
    item.total -= 1;
    item.productTotalPrice = this.subtract(item.productTotalPrice, price, 2);
    cartTotalItems -= 1;
    cartTotalPrice = this.subtract(cartTotalPrice, price, 2);
    this.setState({
      cartItems: {
        items,
        cartTotalPrice,
        cartTotalItems,
      },
    }, this.saveCartInLocalStorage);
  }

  clearCart = () => {
    this.setState({
      cartItems: {
        items: [],
        cartTotalPrice: 0,
        cartTotalItems: 0,
      },
    }, this.saveCartInLocalStorage);
  }

  render() {
    const { cartItems, cartTotalPrice } = this.state;
    return (
      <div>
        <BrowserRouter>
          <Header cartItems={ cartItems } />
          <Route exact path="/">
            <Home addProduct={ this.addProduct } cartItems={ cartItems } />
          </Route>
          <Route exact path="/cart">
            <Cart
              cartItems={ cartItems }
              removeProduct={ this.removeProduct }
              increaseProductQuantity={ this.increaseProductQuantity }
              decreaseProductQuantity={ this.decreaseProductQuantity }
              clearCart={ this.clearCart }
            />
          </Route>
          <Route
            exact
            path="/product/:id"
            render={ (props) => (<Details
              { ...props }
              addProduct={ this.addProduct }
              cartItems={ cartItems }
            />) }
          />
          <Route exact path="/checkout">
            <Checkout
              cartItems={ cartItems }
              cartTotalPrice={ cartTotalPrice }
              removeProduct={ this.removeProduct }
              increaseProductQuantity={ this.increaseProductQuantity }
              decreaseProductQuantity={ this.decreaseProductQuantity }
            />
          </Route>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
