import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';

import { listProducts } from '../actions/productActions';

const HomePage = ({ match, location }) => {
  const query = new URLSearchParams(location.search);

  const keyword = query.get('keyword') || '';
  const pageNum = query.get('page') || 1;

  const dispatch = useDispatch();

  const { loading, error, products, page, pages } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(listProducts(keyword, pageNum));
  }, [dispatch, keyword, pageNum]);

  return (
    <>
      {keyword ? (
        <h1>Search result for '{keyword}'</h1>
      ) : (
        <h1>Latest Product</h1>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            to='/'
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomePage;
