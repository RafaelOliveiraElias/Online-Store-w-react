import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import './rate.css';

// https://codepen.io/jamesbarnett/pen/najzYK referencia ratings stars

export default class Rates extends Component {
  constructor() {
    super();
    this.state = {
      comment: '',
      email: '',
      rating: 1,
    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleButton = (e) => {
    e.preventDefault();
    const { productId } = this.props;
    const { rating, email, comment } = this.state;
    const allRatesStart = JSON.parse(localStorage.getItem(`product${productId}`));
    if (!allRatesStart) {
      const allRates = [{
        email: [email],
        comment: [comment],
        rating: [rating],
      }];
      localStorage.setItem(`product${productId}`, JSON.stringify(allRates));
    } else {
      const allRates = [...allRatesStart, {
        email: [email],
        comment: [comment],
        rating: [rating],
      }];
      localStorage.setItem(`product${productId}`, JSON.stringify(allRates));
    }
    this.setState({
      comment: '',
      email: '',
      rating: 1,
    });
  }

  handleChangeRating = (rating) => {
    this.setState({
      rating,
    });
  }

  render() {
    const { email, comment } = this.state;
    const { productId } = this.props;
    const arrayRating = [];
    const maxValue = 5;
    for (let index = maxValue; index > 0; index -= 1) {
      arrayRating.push(index);
    }
    return (
      <div className="divRate">
        <h2>Avaliações:</h2>
        <form className="newAva">
          <h3>Faça sua avaliação:</h3>
          <div className="iputes">
            <label htmlFor="product-detail-email" className="mailds">
              Email:
            </label>
            <input
              type="email"
              id="product-detail-email"
              data-testid="product-detail-email"
              name="email"
              onChange={ this.handleChange }
              value={ email }
            />
          </div>
          <div className="iputes">
            <label htmlFor="product-detail-evaluation">
              Comentario:
            </label>
            <textarea
              id="product-detail-evaluation"
              data-testid="product-detail-evaluation"
              name="comment"
              onChange={ this.handleChange }
              value={ comment }
            />
          </div>
          <span>Avaliação: </span>
          <fieldset className="rating">
            {arrayRating.map((each) => (
              <>
                <input
                  type="radio"
                  value={ each }
                  id={ `star${each}` }
                  name="rating"
                  data-testid={ `${each}-rating` }
                  onChange={ this.handleChange }
                />
                <label htmlFor={ `star${each}` } key={ each } />
              </>
            ))}
          </fieldset>
          <button
            type="submit"
            data-testid="submit-review-btn"
            className="addAva"
            onClick={ this.handleButton }
          >
            Enviar Avaliação
          </button>
        </form>
        <div>
          {JSON.parse(localStorage.getItem(`product${productId}`))
            ? JSON.parse(localStorage.getItem(`product${productId}`))
              .map((each, index) => (
                <div className="ansawe" key={ index }>
                  <div>
                    <span>Email: </span>
                    <span>{each.email}</span>
                  </div>
                  <div>
                    <span>Avaliação: </span>
                    <p>{each.comment}</p>
                  </div>
                  <div className="sizeRa" data-testid={ `${index}-rating` }>
                    <StarRatings
                      rating={ Number(each.rating) }
                      starDimension="20px"
                      starSpacing="4px"
                      starRatedColor="blue"
                      numberOfStars={ 5 }
                      name="rating"
                    />
                  </div>
                </div>
              )) : null }
        </div>
      </div>
    );
  }
}
