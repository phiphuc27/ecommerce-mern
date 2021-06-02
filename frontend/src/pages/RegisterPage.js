import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterPage = ({ history, location }) => {
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();

  const { loading, error, userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const registerSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .required('Required')
      .min(6, 'Password must have at least 6 characters'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password')],
      'Password do not match'
    ),
  });

  const { handleChange, handleBlur, handleSubmit, values, errors } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      const { name, email, password } = values;
      dispatch(register(name, email, password));
    },
  });

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            className={errors.name && 'is-invalid'}
            placeholder='Username'
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          ></Form.Control>
          {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
        </Form.Group>

        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            className={errors.email && 'is-invalid'}
            placeholder='Email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          ></Form.Control>
          {errors.email && (
            <div className='invalid-feedback'>{errors.email}</div>
          )}
        </Form.Group>

        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            className={errors.password && 'is-invalid'}
            placeholder='Password (must have 6 characters or more)'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          ></Form.Control>
          {errors.password && (
            <div className='invalid-feedback'>{errors.password}</div>
          )}
        </Form.Group>

        <Form.Group className='mb-3' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            className={errors.confirmPassword && 'is-invalid'}
            placeholder='Confirm password'
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          ></Form.Control>
          {errors.confirmPassword && (
            <div className='invalid-feedback'>{errors.confirmPassword}</div>
          )}
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Log In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
