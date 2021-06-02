import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentPage = ({ history }) => {
  const { shippingAddress } = useSelector((state) => state.cart);

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const dispatch = useDispatch();

  const paymentSchema = Yup.object().shape({
    paymentMethod: Yup.string().required('Required'),
  });

  const { handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      paymentMethod: 'PayPal',
    },
    validationSchema: paymentSchema,
    onSubmit: (values) => {
      dispatch(savePaymentMethod(values.paymentMethod));
      history.push('/placeorder');
    },
  });

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='paymentMethod'>
          <Form.Label as='h5'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              name='paymentMethod'
              value='PayPal'
              defaultChecked
              onChange={handleChange}
              onBlur={handleBlur}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
