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
      cartItem.total += 1;
      this.setState({ cartItems });
    } else {
      (
        this.setState({ cartItems: [...cartItems, { product, total: 1 }] })
      );
    }
  }

  removeProducts = (product) => {
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
      const { total } = cartItem;
      if (total - 1 === 0) {
        this.setState({ cartItems: newCartItem });
      } else {
        cartItem.total -= 1;
        this.setState({ cartItems });
      }
    }
  }

  clearCart = () => {
    this.setState({ cartItems: [] });
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
            <Cart
              products={ cartItems }
              addProducts={ this.addProducts }
              removeProducts={ this.removeProducts }
              clearCart={ this.clearCart }
            />
          </Route>
          <Route
            exact
            path="/product/:id"
            render={ (props) => (<Details
              { ...props }
              addProducts={ this.addProducts }
            />) }
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
