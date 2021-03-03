import './add-article.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import VisibleTo from '../visible-to/visible-to';

function AddArticle({ display, article, toggleDropdown, onSubmit }) {
  const { title, text, visible_to } = article;

  return (
    <div>
      <Formik
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={{
          title,
          text,
          visible_to,
        }}
        validationSchema={ArticleSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" placeholder="Title" />
            {errors.title && touched.title ? <div>{errors.title}</div> : null}

            <label htmlFor="text">Text</label>
            <Field id="text" name="text">
              {({ field }) => (
                <div>
                  <textarea placeholder="Text" {...field} />
                </div>
              )}
            </Field>
            {errors.text && touched.text ? <div>{errors.text}</div> : null}

            <button onClick={toggleDropdown}>Visible to</button>
            {display && <VisibleTo />}

            <button type="submit">Share</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const ArticleSchema = Yup.object().shape({
  title: Yup.string().max(50, 'Title length should not exceed 50 characters'),
  text: Yup.string()
    .min(1)
    .max(2000, 'Text length should not exceed 2000 characters')
    .required('You have to write at least something'),
});

AddArticle.propTypes = {
  display: PropTypes.bool.isRequired,
  article: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
    created_at: PropTypes.string,
  }),
  toggleDropdown: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddArticle;
