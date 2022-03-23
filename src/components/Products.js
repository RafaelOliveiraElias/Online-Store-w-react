import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Product from './Product';

export default class Products extends Component {
  loadingOr = () => {
    const { searched } = this.props;
    if (!searched) {
      return <p className="loading encontrado">Busque por um produto ou categoria</p>;
    }
    return <p className="loading encontrado">Nenhum produto foi encontrado</p>;
  }

  render() {
    const { productsInfos, addProduct } = this.props;
    return (
      <div className="allProducts">
        {
          !productsInfos.length > 0
            ? this.loadingOr()
            : productsInfos.map((element) => (
              <Product
                productInfo={ element }
                key={ element.id }
                addProduct={ addProduct }
                { ...this.props }
              />
            ))
        }
      </div>
    );
  }
}

Products.propTypes = {
  productsInfos: PropTypes.arrayOf(PropTypes.object).isRequired,
  addProduct: PropTypes.func.isRequired,
  searched: PropTypes.bool.isRequired,
};
