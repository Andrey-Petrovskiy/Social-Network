import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import './profile.css';

function Profile({ handleUsername }) {
  return (
    <div className="profile">
      <Formik initialValues={{}} onSubmit={handleUsername}>
        <Form>
          <label htmlFor="firstName">First name</label>
          <Field id="firstName" name="firstName" placeholder="Enter first name" />

          <label htmlFor="lastName">Last name</label>
          <Field id="lastName" name="lastName" placeholder="Enter last name" />

          <button>Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

Profile.propTypes = {
  handleUsername: PropTypes.func,
};

export default Profile;
