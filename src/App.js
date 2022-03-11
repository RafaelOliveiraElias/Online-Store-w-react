import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Details from './pages/Details';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={ Home } />
        <Route exact path="/cart" component={ Cart } />
        <Route exact path="/product/:id" component={ Details } />
      </BrowserRouter>
    </div>
  );
}

export default App;
