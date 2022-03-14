import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import Details from './pages/Details';
import Home from './pages/Home';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: { items: [], cartTotalPrice: 0, cartTotalItems: 0 },
    };
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
    if (itemInTheCart) return;
    const { price } = product;
    this.setState({
      cartItems: {
        items: [...items, { product, total: 1, productTotalPrice: price }],
        cartTotalPrice: this.sum(cartTotalPrice, price, 2),
        cartTotalItems: cartTotalItems + 1,
      },
    });
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
    });
  }

  increaseProductQuantity = (product) => {
    const { cartItems } = this.state;
    let { cartTotalPrice, cartTotalItems } = cartItems;
    const { items } = cartItems;
    const item = items.find((cartItem) => {
      if (product.id === cartItem.product.id) return true;
      return false;
    });
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
    });
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
    });
  }

  clearCart = () => {
    this.setState({ cartItems: { items: [], cartTotalPrice: 0, cartTotalItems: 0 } });
  }

  render() {
    const { cartItems } = this.state;
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/">
            <Home addProduct={ this.addProduct } />
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
            />) }
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
