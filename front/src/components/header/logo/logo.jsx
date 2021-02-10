import React from 'react';
import './logo.css';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <div className="logo">
      <Link to="/">
        <span className="logo-text">inTouch</span>
      </Link>
    </div>
  );
}

export default Logo;
