import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';

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
    const { rating, email, comment } = this.state;
    const allRatesStart = JSON.parse(localStorage.getItem('allRates'));
    if (!allRatesStart) {
      const allRates = [{
        email: [email],
        comment: [comment],
        rating: [rating],
      }];
      localStorage.setItem('allRates', JSON.stringify(allRates));
    } else {
      const allRates = [...allRatesStart, {
        email: [email],
        comment: [comment],
        rating: [rating],
      }];
      localStorage.setItem('allRates', JSON.stringify(allRates));
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
    const arrayRating = [];
    const maxValue = 6;
    for (let index = 1; index < maxValue; index += 1) {
      arrayRating.push(index);
    }
    return (
      <>
        <form>
          <label htmlFor="product-detail-email">
            Email
            <input
              type="email"
              id="product-detail-email"
              data-testid="product-detail-email"
              name="email"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>

          <label htmlFor="product-detail-evaluation">
            Comentario
            <textarea
              id="product-detail-evaluation"
              data-testid="product-detail-evaluation"
              name="comment"
              onChange={ this.handleChange }
              value={ comment }
            />
          </label>

          {arrayRating.map((each) => (
            <label htmlFor={ `${each}-index` } key={ each }>
              <input
                type="radio"
                value={ each }
                name="rating"
                data-testid={ `${each}-rating` }
                onChange={ this.handleChange }
              />
              {each}
            </label>
          ))}

          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ this.handleButton }
          >
            Enviar Avaliação
          </button>
        </form>
        <div>
          {JSON.parse(localStorage.getItem('allRates'))
            ? JSON.parse(localStorage.getItem('allRates'))
              .map((each, index) => (
                <div key={ index }>
                  <h4>{each.email}</h4>
                  <p>{each.comment}</p>
                  <div data-testid={ `${index}-rating` }>
                    <StarRatings
                      rating={ Number(each.rating) }
                      starRatedColor="blue"
                      numberOfStars={ 5 }
                      name="rating"
                    />
                  </div>
                </div>
              )) : null }
        </div>
      </>
    );
  }
}
