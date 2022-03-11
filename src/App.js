import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Details from './pages/Details';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
    };
  }

  addProducts = (product) => {
    const { cartItems } = this.state;
    const cartItem = cartItems.find((item) => {
      if (product.id === item.product.id) return true;
      return false;
    });
    if (cartItem) {
      const newCartItem = cartItems.filter((item) => {
        if (cartItem.product.id !== item.product.id) return true;
        return false;
      });
      const { product: item, total } = cartItem;
      this.setState({ cartItems: [...newCartItem, { product: item, total: total + 1 }] });
    } else {
      (
        this.setState({ cartItems: [...cartItems, { product, total: 1 }] })
      );
    }
  }

  render() {
    const { cartItems } = this.state;
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/">
            <Home addProducts={ this.addProducts } />
          </Route>
          <Route exact path="/cart">
            <Cart products={ cartItems } />
          </Route>
          <Route exact path="/product/:id" component={ Details } />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
