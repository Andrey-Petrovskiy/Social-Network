import React from 'react';
import PropTypes from 'prop-types';
import HeaderButton from '../header-button/header-button';

function HeaderButtonList({ buttonData }) {
  const elements = buttonData.map((item) => {
    return <HeaderButton {...item} />;
  });

  return <div>{elements}</div>;
}

HeaderButtonList.propTypes = {
  buttonData: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ),
};

export default HeaderButtonList;
