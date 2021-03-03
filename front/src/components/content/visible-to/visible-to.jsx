import React from 'react';
import './visible-to.css';
import { Field } from 'formik';

function VisibleTo() {
  return (
    <div>
      <label>
        <Field type="radio" name="visible_to" value="all" />
        All
      </label>
      <label>
        <Field type="radio" name="visible_to" value="friends" />
        My friends
      </label>
      <label>
        <Field type="radio" name="visible_to" value="me" />
        Only me
      </label>
    </div>
  );
}

export default VisibleTo;
