import './header.css';
import React from 'react';
import Logo from '../logo/logo';
import Avatar from '../avatar/avatar';
import HeaderButtonList from '../header-button-list/header-button-list';

function Header({ handleTab, username }) {
  const buttonData = [
    { key: 1, label: 'Articles' },
    { key: 2, label: 'Add Article' },
    { key: 3, label: 'Profile' },
  ];
  return (
    <div className="header">
      <Logo />
      <HeaderButtonList buttonData={buttonData} handleTab={handleTab} />
      <Avatar username={username} />
    </div>
  );
}

export default Header;
