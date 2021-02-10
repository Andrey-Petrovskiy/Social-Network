import React from 'react';
import PropTypes from 'prop-types';
import './header-button.css';
import { Link } from 'react-router-dom';

function HeaderButton({ label }) {
  const link = label.toString().toLowerCase().replace(' ', '-');

  return (
    <Link to={`/${link}`}>
      <div className="header-btn">
        <span className="header-btn-text">{label}</span>
      </div>
    </Link>
  );
}

HeaderButton.propTypes = {
  label: PropTypes.string.isRequired,
};

export default HeaderButton;
