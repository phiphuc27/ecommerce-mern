import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants';

const ProductListPage = ({ history, location }) => {
  const query = new URLSearchParams(location.search);

  const pageNum = query.get('page') || '';

  const dispatch = useDispatch();

  const {
    products,
    product: createdProduct,
    loading,
    createLoading,
    error,
    deleteSuccess,
    createSuccess,
    page,
    pages,
  } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/');
    } else {
      dispatch(listProducts('', pageNum));
    }
  }, [dispatch, userInfo, history, pageNum]);

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(listProducts('', pageNum));
    }
  }, [dispatch, deleteSuccess, pageNum]);

  useEffect(() => {
    if (createSuccess) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    }
  }, [createSuccess, history, createdProduct]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='d-flex align-items-center justify-content-end'>
          {createLoading && <Loader inline size='sm' />}
          <Button
            className='my-3'
            onClick={createProductHandler}
            disabled={createLoading}
          >
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='primary' className='btn-sm me-2'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} to='/admin/product' />
        </>
      )}
    </>
  );
};

export default ProductListPage;
