import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import Box from '@material-ui/core/Box';
import CustomRadioField from './Fields/CustomRadioField';
import CustomTextField from './Fields/CustomTextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

function AddArticle({ article, onSubmit }) {
  const { title, text, visible_to } = article;

  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogContent>
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
          {({ errors, touched, values, handleChange }) => (
            <Form>
              <Box mb={3} className={classes.input}>
                <CustomTextField id="title" name="title" label="Title" onChange={handleChange} />
              </Box>
              <Box mb={3} className={classes.input}>
                <CustomTextField
                  id="text"
                  label="Text"
                  multiline
                  variant="outlined"
                  onChange={handleChange}
                  value={values.text}
                  error={touched.text && !!errors.text}
                />
              </Box>
              <Box mb={3} className={classes.input}>
                <FormLabel component="legend">Visible to:</FormLabel>
                <RadioGroup
                  aria-label="position"
                  name="position"
                  value={values.visible_to}
                  onChange={handleChange}
                >
                  <CustomRadioField
                    value="all"
                    control={<Radio />}
                    label="All"
                    labelPlacement="end"
                    name="visible_to"
                  />
                  <CustomRadioField
                    value="friends"
                    control={<Radio />}
                    label="My friends"
                    labelPlacement="end"
                    name="visible_to"
                  />
                  <CustomRadioField
                    value="me"
                    control={<Radio />}
                    label="Only me"
                    labelPlacement="end"
                    name="visible_to"
                  />
                </RadioGroup>
              </Box>
              <div>
                <Button variant="contained" type="submit">
                  Share
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
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
  article: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
    created_at: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default AddArticle;
