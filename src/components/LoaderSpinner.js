import React, { Component } from 'react';
import loading from '../icons/loading.gif';

export default class LoaderSpinner extends Component {
  render() {
    return (
      <div className="ldImgContainer">
        <img src={ loading } alt="loading" />
      </div>
    );
  }
}
