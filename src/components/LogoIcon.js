import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../icons/logo.png';

class LogoIcon extends React.Component {
  render() {
    return (
      <Link to="/">
        <img
          src={ logo }
          alt="TrybeStore"
        />
      </Link>
    );
  }
}

export default LogoIcon;
