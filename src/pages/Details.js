import React from 'react';
import PropTypes from 'prop-types';
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

    render() {
      const { loading, data } = this.state;
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
          <div>
            <p>Especificações do Produto</p>
            {data.attributes.map((attribute) => (
              <div key={ attribute.id }>
                <p>{attribute.name}</p>
                <p>{attribute.value_name}</p>
              </div>
            ))}
          </div>
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
}.isRequired;
