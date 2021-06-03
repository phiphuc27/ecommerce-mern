import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Breadcrumb,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';

const ProductPage = ({ history, match }) => {
  const productId = match.params.id;
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const {
    loading,
    error,
    product,
    createReviewLoading,
    createReviewSuccess,
    createReviewError,
  } = useSelector((state) => state.product);

  const { userInfo } = useSelector((state) => state.user);

  const reviewSchema = Yup.object().shape({
    rating: Yup.string().required('Required'),
    comment: Yup.string().required('Required'),
  });

  const { handleChange, handleBlur, handleSubmit, values, errors, resetForm } =
    useFormik({
      initialValues: {
        rating: '',
        comment: '',
      },
      validationSchema: reviewSchema,
      onSubmit: (values) => {
        const { rating, comment } = values;
        dispatch(createProductReview(match.params.id, { rating, comment }));
      },
    });

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (createReviewSuccess) {
      alert('Review Submitted');
      resetForm();
      dispatch(listProductDetails(productId));
    }
  }, [createReviewSuccess, dispatch, productId, resetForm]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Breadcrumb>
        <LinkContainer to='/'>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>
        {product && <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>}
      </Breadcrumb>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating ? product.rating : 0}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col className='mt-1'>Qty:</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1}>{x + 1}</option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item className='d-grid'>
                    <Button
                      type='button'
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col md={12}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message variant='light'>No Reviews</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <Card className='bg-light'>
                      <Card.Body>
                        <div className='d-flex justify-content-between'>
                          <div>
                            <Card.Title>
                              <strong>{review.name}</strong>
                            </Card.Title>
                            <Rating value={review.rating} />
                          </div>
                          <Card.Text className='text-muted'>
                            {review.createdAt.substring(0, 10)}
                          </Card.Text>
                        </div>
                        <Card.Text>{review.comment}</Card.Text>
                      </Card.Body>
                    </Card>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {createReviewError && (
                    <Message variant='danger'>{createReviewError}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className='mb-4' controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={values.rating}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={errors.rating && 'is-invalid'}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Very Bad</option>
                          <option value='2'>2 - Bad</option>
                          <option value='3'>3 - Fair</option>
                          <option value='4'>4 - Good</option>
                          <option value='5'>5 - Very Good</option>
                        </Form.Control>
                        {errors.rating && (
                          <div className='invalid-feedback'>
                            {errors.rating}
                          </div>
                        )}
                      </Form.Group>
                      <Form.Group className='mb-4' controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          rows={5}
                          value={values.comment}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={errors.comment && 'is-invalid'}
                        ></Form.Control>
                        {errors.comment && (
                          <div className='invalid-feedback'>
                            {errors.comment}
                          </div>
                        )}
                      </Form.Group>
                      <div className='d-flex align-items-center'>
                        <Button
                          type='submit'
                          variant='primary'
                          disabled={createReviewLoading}
                        >
                          Submit
                        </Button>
                        {createReviewLoading && <Loader inline size='sm' />}
                      </div>
                    </Form>
                  ) : (
                    <Message variant='light'>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductPage;
