import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Checkout from './pages/Checkout';
import Details from './pages/Details';
import Home from './pages/Home';
import * as api from './services/api';
import * as appfuncs from './services/appfuncs';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: { items: [], cartTotalPrice: 0, cartTotalItems: 0 },
      checkedCard: false,
      searchQuery: '',
      productsInfos: [],
      searchCategory: '',
      searched: false,
      loading: false,
      orderOfProducts: 'relevance',
    };
  }

  componentDidMount() {
    this.setState({ cartItems: appfuncs.getCartInLocalStorage() });
  }

  handleChecked = () => {
    this.setState((prevs) => ({
      checkedCard: !prevs.checkedCard,
    }));
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
        cartTotalPrice: appfuncs.sum(cartTotalPrice, price, 2),
        cartTotalItems: cartTotalItems + 1,
      },
    }, appfuncs.saveCartInLocalStorage);
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
        cartTotalPrice: appfuncs.subtract(cartTotalPrice, productTotalPrice, 2),
        cartTotalItems: cartTotalItems - total,
      },
    }, appfuncs.saveCartInLocalStorage);
  }

  getProductInTheCart = (id) => {
    const { cartItems: { items } } = this.state;
    return items.find(({ product }) => product.id === id);
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
    item.productTotalPrice = appfuncs.sum(item.productTotalPrice, price, 2);
    cartTotalItems += 1;
    cartTotalPrice = appfuncs.sum(cartTotalPrice, price, 2);
    this.setState({
      cartItems: {
        items,
        cartTotalPrice,
        cartTotalItems,
      },
    }, appfuncs.saveCartInLocalStorage);
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
    item.productTotalPrice = appfuncs.subtract(item.productTotalPrice, price, 2);
    cartTotalItems -= 1;
    cartTotalPrice = appfuncs.subtract(cartTotalPrice, price, 2);
    this.setState({
      cartItems: {
        items,
        cartTotalPrice,
        cartTotalItems,
      },
    }, appfuncs.saveCartInLocalStorage);
  }

  clearCart = () => {
    this.setState({
      cartItems: {
        items: [],
        cartTotalPrice: 0,
        cartTotalItems: 0,
      },
    }, appfuncs.saveCartInLocalStorage);
  }

  handleChange = ({ target }) => {
    this.setState({
      searchQuery: target.value,
    });
  };

  handleClick = async () => {
    const { searchQuery } = this.state;
    let { orderOfProducts } = this.state;
    orderOfProducts = `&sort=${orderOfProducts}`;
    const data = await api.getProductsFromQuery(searchQuery + orderOfProducts);
    this.setState({ productsInfos: data.results, loading: false });
  }

  categorySelect = async ({ target }) => {
    const valueTarget = target.value;
    this.setState({
      searchCategory: valueTarget,
      loading: true,
    });
    let { orderOfProducts } = this.state;
    orderOfProducts = `&sort=${orderOfProducts}`;

    const { searchQuery } = this.state;
    const search = await api
      .getProductsFromCategoryAndQuery(valueTarget, searchQuery + orderOfProducts);

    this.setState({ productsInfos: search.results, loading: false });
  };

  handleOrderOfProducts = async ({ target }) => {
    const { value } = target;
    this.setState({ orderOfProducts: value });
    const { searchQuery, searchCategory } = this.state;
    const orderOfProducts = `&sort=${value}`;
    const search = await api
      .getProductsFromCategoryAndQuery(searchCategory, searchQuery + orderOfProducts);

    this.setState({ productsInfos: search.results, loading: false });
  }

  render() {
    const { cartItems, cartTotalPrice, productsInfos, checkedCard,
      searchCategory, searchQuery, searched, loading, orderOfProducts } = this.state;
    return (
      <div>
        <BrowserRouter>
          <Header
            searched={ searched }
            cartItems={ cartItems }
            searchQuery={ searchQuery }
            searchCategory={ searchCategory }
            checkedCard={ checkedCard }
            productsInfos={ productsInfos }
            handleChange={ this.handleChange }
            handleClick={ this.handleClick }
            categorySelect={ this.categorySelect }
            handleOrderOfProducts={ this.handleOrderOfProducts }
            orderOfProducts={ orderOfProducts }
            handleChecked={ this.handleChecked }
          />
          <Switch>
            <Route
              exact
              path="/"
              render={ (props) => (
                <Home
                  { ...props }
                  searched={ searched }
                  addProduct={ this.addProduct }
                  checkedCard={ checkedCard }
                  cartItems={ cartItems }
                  searchCategory={ searchCategory }
                  productsInfos={ productsInfos }
                  handleClick={ this.handleClick }
                  categorySelect={ this.categorySelect }
                  loading={ loading }
                  handleOrderOfProducts={ this.handleOrderOfProducts }
                  orderOfProducts={ orderOfProducts }
                  getProductInTheCart={ this.getProductInTheCart }
                  cartTotalPrice={ cartTotalPrice }
                  removeProduct={ this.removeProduct }
                  increaseProductQuantity={ this.increaseProductQuantity }
                  decreaseProductQuantity={ this.decreaseProductQuantity }
                />) }
            />
            <Route
              exact
              path="/product/:id"
              render={ (props) => (<Details
                { ...props }
                getProductInTheCart={ this.getProductInTheCart }
                increaseProductQuantity={ this.increaseProductQuantity }
                decreaseProductQuantity={ this.decreaseProductQuantity }
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
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
