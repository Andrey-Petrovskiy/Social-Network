import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';

function Profile({ handleUsername }) {
  return (
    <Formik initialValues={{}} onSubmit={handleUsername}>
      <Form>
        <label htmlFor="firstName">First name</label>
        <Field id="firstName" name="firstName" placeholder="Enter first name" />

        <label htmlFor="lastName">Last name</label>
        <Field id="lastName" name="lastName" placeholder="Enter last name" />

        <button>Submit</button>
      </Form>
    </Formik>
  );
}

Profile.propTypes = {
  handleUsername: PropTypes.func,
};

export default Profile;
