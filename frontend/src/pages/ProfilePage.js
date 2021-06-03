import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Row, Col, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserProfile, updateUserProfile } from '../actions/userActions';
import { getMyOrders } from '../actions/orderActions';

const ProfilePage = ({ history, location }) => {
  const dispatch = useDispatch();

  const { loading, error, updateSuccess, user, userInfo } = useSelector(
    (state) => state.user
  );

  const {
    loading: loadingOrder,
    orders,
    error: errorOrder,
  } = useSelector((state) => state.order);

  const profileSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password must have at least 6 characters'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password')],
      'Password do not match'
    ),
  });

  const { handleChange, handleBlur, handleSubmit, setValues, values, errors } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      validationSchema: profileSchema,
      onSubmit: (values) => {
        const { name, email, password } = values;
        dispatch(updateUserProfile({ id: user._id, name, email, password }));
      },
    });

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user) {
        dispatch(getUserProfile('profile'));
        dispatch(getMyOrders());
      } else {
        dispatch(getMyOrders());
        setValues({
          name: user.name,
          email: user.email,
          password: '',
          confirmPassword: '',
        });
      }
    }
  }, [dispatch, userInfo, user, history, setValues]);

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          updateSuccess && <Message variant='success'>Profile Updated</Message>
        )}
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
            {errors.name && (
              <div className='invalid-feedback'>{errors.name}</div>
            )}
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
              placeholder='Password'
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
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrder ? (
          <Loader />
        ) : errorOrder ? (
          <Message variant='danger'>{errorOrder}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td className='d-grid'>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='primary'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
