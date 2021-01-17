import React from 'react';
import PropTypes from 'prop-types';
import './profile.css';

function Profile({ handleUsername }) {
  return (
    <div className="profile">
      <h2>Profile Information</h2>
      <form onSubmit={handleUsername}>
        <label>Enter your name</label>
        <br />
        <input type="name" placeholder="First name" />
        <br />
        <input type="name" placeholder="Last name" />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

Profile.propTypes = {
  handleUsername: PropTypes.func,
};

export default Profile;
