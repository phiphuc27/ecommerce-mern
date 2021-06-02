import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingPage = ({ history }) => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const shippingSchema = Yup.object().shape({
    address: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    postalCode: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
  });

  const { handleChange, handleBlur, handleSubmit, values, errors } = useFormik({
    initialValues: {
      address: shippingAddress.address || '',
      city: shippingAddress.city || '',
      postalCode: shippingAddress.postalCode || '',
      country: shippingAddress.country || '',
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      dispatch(saveShippingAddress(values));
      history.push('/payment');
    },
  });

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            className={errors.address && 'is-invalid'}
            placeholder='Address'
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
          ></Form.Control>
          {errors.address && (
            <div className='invalid-feedback'>{errors.address}</div>
          )}
        </Form.Group>

        <Form.Group className='mb-3' controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            className={errors.city && 'is-invalid'}
            placeholder='City'
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
          ></Form.Control>
          {errors.city && <div className='invalid-feedback'>{errors.city}</div>}
        </Form.Group>

        <Form.Group className='mb-3' controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            className={errors.postalCode && 'is-invalid'}
            placeholder='Postal Code'
            value={values.postalCode}
            onChange={handleChange}
            onBlur={handleBlur}
          ></Form.Control>
          {errors.postalCode && (
            <div className='invalid-feedback'>{errors.postalCode}</div>
          )}
        </Form.Group>

        <Form.Group className='mb-3' controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            className={errors.country && 'is-invalid'}
            placeholder='Country'
            value={values.country}
            onChange={handleChange}
            onBlur={handleBlur}
          ></Form.Control>
          {errors.country && (
            <div className='invalid-feedback'>{errors.country}</div>
          )}
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
