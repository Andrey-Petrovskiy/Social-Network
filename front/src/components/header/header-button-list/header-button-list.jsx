import React from 'react';
import PropTypes from 'prop-types';
import HeaderButton from '../header-button/header-button';

function HeaderButtonList({ handleTab, buttonData }) {
  const elements = buttonData.map((item) => {
    return <HeaderButton {...item} handleTab={handleTab(item.label)} />;
  });

  return <div>{elements}</div>;
}

HeaderButtonList.propTypes = {
  handleTab: PropTypes.func,
  buttonData: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default HeaderButtonList;
