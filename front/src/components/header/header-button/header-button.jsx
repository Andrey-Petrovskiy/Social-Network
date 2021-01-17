import React from 'react';
import PropTypes from 'prop-types';
import './header-button.css';

function HeaderButton({ handleTab, label }) {
  return (
    <div className="header-btn" onClick={handleTab}>
      <span className="header-btn-text">{label}</span>
    </div>
  );
}

HeaderButton.propTypes = {
  handleTab: PropTypes.func,
  label: PropTypes.string,
};

export default HeaderButton;
