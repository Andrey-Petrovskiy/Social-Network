import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import VisibleTo from './VisibleTo';
import CustomTextField from './Fields/CustomTextField';
import { avatarUrl } from '../config/variables';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .max(255, 'Name length should not exceed 50 characters')
    .required('Name is required'),
  email: Yup.string().email(),
  phone: Yup.string()
    .matches(/^\+?3?8?(0[5-9][0-9]\d{7})$/)
    .required('Please enter a valid Ukrainian phone number'),
});

function Profile({ user, onSubmitUpdateUser, onSubmitUpdateAvatar }) {
  const { id, name, email, phone } = user;

  const [image, setImage] = useState();
  const [croppedImage, setCroppedImage] = useState();
  const [cropper, setCropper] = useState();

  const handleSubmit = (data) => {
    onSubmitUpdateUser(data);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const cropImage = () => {
    if (typeof cropper !== 'undefined') {
      setCroppedImage(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          name,
          email,
          phone,
        }}
        validationSchema={UserSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Box>
              <CustomTextField
                id="name"
                name="name"
                label="Name"
                error={touched.name && Boolean(errors.name)}
              />
            </Box>
            <Box>
              <CustomTextField
                id="email"
                name="email"
                label="Email"
                disabled
                error={touched.email && Boolean(errors.email)}
              />
            </Box>
            <Box>
              <CustomTextField
                id="phone"
                name="phone"
                label="Phone"
                error={touched.phone && Boolean(errors.phone)}
              />
            </Box>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Form>
        )}
      </Formik>
      <div>
        {!image && (
          <div>
            <img src={avatarUrl(id)} alt="user-avatar" />
            <Button variant="contained" color="primary" component="label">
              Upload Image
              <input type="file" hidden onChange={handleChange} />
            </Button>
          </div>
        )}

        {image && !croppedImage && (
          <Cropper src={image} onInitialized={(instance) => setCropper(instance)} />
        )}

        {croppedImage && (
          <div>
            <img src={croppedImage} alt="user-avatar" />
            <Button
              variant="contained"
              color="primary"
              onClick={() => onSubmitUpdateAvatar({ avatar: croppedImage })}
            >
              Set Avatar
            </Button>
          </div>
        )}

        {image && !croppedImage && (
          <Button variant="contained" color="primary" onClick={cropImage}>
            Crop Image
          </Button>
        )}
      </div>
    </div>
  );
}

Profile.propTypes = {
  handleUsername: PropTypes.func,
};

export default Profile;
