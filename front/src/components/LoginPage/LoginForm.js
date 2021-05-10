import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import CustomTextField from '../Fields/CustomTextField';
import SocialButton from '../Buttons/SocialButton';
import useAuth from '../../hooks/useAuth';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/FormLabel';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8, 'Password should contain at least 8 characters'),
});

function LoginForm() {
  const { login, socialLogin } = useAuth();

  const handleGoogleLogin = (data) => socialLogin('google', data);

  const handleFacebookLogin = (data) => socialLogin('facebook', data);

  const handleSocialLoginFailure = (err) => console.log(err);

  return (
    <>
      <div>
        <Formik
          enableReinitialize
          initialValues={{}}
          onSubmit={login}
          validationSchema={LoginSchema}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form>
              <Box>
                <InputLabel>Email:</InputLabel>
                <CustomTextField
                  id="email"
                  onChange={handleChange}
                  name="email"
                  value={values.email}
                  error={touched.email && Boolean(errors.email)}
                />
              </Box>
              <Box>
                <InputLabel>Password:</InputLabel>
                <CustomTextField
                  id="password"
                  onChange={handleChange}
                  name="password"
                  value={values.password}
                  error={touched.password && Boolean(errors.password)}
                />
              </Box>
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <br />
      <div>
        <SocialButton
          provider="google"
          /*appId={process.env.REACT_APP_GOOGLE_CLIENT_ID}*/
          appId="982718515675-77o8mecnrrh13at7rpu2hngf7a5r9hom.apps.googleusercontent.com"
          onLoginSuccess={handleGoogleLogin}
          onLoginFailure={handleSocialLoginFailure}
          variant="contained"
          color="primary"
        >
          Login with Google
        </SocialButton>
        <SocialButton
          provider="facebook"
          appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
          onLoginSuccess={handleFacebookLogin}
          onLoginFailure={handleSocialLoginFailure}
          variant="contained"
          color="primary"
        >
          Login with Facebook
        </SocialButton>
      </div>
    </>
  );
}

export default LoginForm;
