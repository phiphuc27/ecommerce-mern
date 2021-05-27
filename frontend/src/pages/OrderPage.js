import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import { Col, Row, ListGroup, Image, Card, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions';
import { resetCart } from '../actions/cartActions';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';

const OrderPage = ({ match, history }) => {
  const dispatch = useDispatch();

  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userInfo) history.push('/login');
  }, [userInfo, history]);

  const {
    order,
    error,
    loading,
    payLoading,
    paySuccess,
    deliverLoading,
    deliverSuccess,
  } = useSelector((state) => state.order);
  const {
    shippingAddress: { address, city, postalCode, country },
    orderItems,
    paymentMethod,
    shippingPrice,
    taxPrice,
    totalPrice,
    user,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  //Calculate prices
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
  const itemsPrice = addDecimals(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order._id || paySuccess) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }

    if (order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, paySuccess, order]);

  useEffect(() => {
    if (deliverSuccess) {
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, deliverSuccess, orderId]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
    dispatch(resetCart());
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {address},{city} {postalCode}, {country}
              </p>
              {isDelivered ? (
                <Message variant='success'>
                  Delivered at {deliveredAt.substring(0, 10)}{' '}
                  {deliveredAt.substring(11, 19)}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
              {isPaid ? (
                <Message variant='success'>
                  Paid on {paidAt.substring(0, 10)} {paidAt.substring(11, 19)}
                </Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {orderItems.length === 0 ? (
                <Message variant='secondary'>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            className=' text-decoration-none link-primary'
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col className='text-danger'>
                    <h4>${totalPrice}</h4>
                  </Col>
                </Row>
              </ListGroup.Item>
              {userInfo && userInfo._id === order.user._id && !order.isPaid && (
                <ListGroup.Item>
                  {!payLoading && <Loader size='sm' className='mb-2' />}
                  {!sdkReady ? (
                    <Loader className='mb-2' />
                  ) : (
                    <PayPalButton
                      amount={totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item className='d-grid'>
                    <Button
                      className='d-flex align-items-center justify-content-center'
                      type='button'
                      size='lg'
                      onClick={deliverHandler}
                      disabled={deliverLoading}
                    >
                      <span>Mark as Delivered</span>{' '}
                      {deliverLoading && <Loader inline size='sm' />}
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
