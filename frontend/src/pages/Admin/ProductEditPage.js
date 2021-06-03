import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import {
  listProductDetails,
  updateProduct,
} from '../../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants';

const ProductEditPage = ({ history, match }) => {
  const productId = match.params.id;

  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const { loading, error, product, updateLoading, updateSuccess } = useSelector(
    (state) => state.product
  );

  const productEditSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    price: Yup.number().required('Required'),
    image: Yup.string().required('Required'),
    brand: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    countInStock: Yup.number().required('Required'),
    description: Yup.string().required('Required'),
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setFieldValue,
    values,
    errors,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      price: 0,
      image: '',
      brand: '',
      category: '',
      countInStock: 0,
      description: '',
    },
    validationSchema: productEditSchema,
    onSubmit: (values) => {
      dispatch(updateProduct({ ...values, _id: productId }));
    },
  });

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/product');
    }
  }, [updateSuccess, history, dispatch]);

  useEffect(() => {
    if (!product._id || product._id !== productId) {
      dispatch(listProductDetails(productId));
    } else {
      setValues({
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        category: product.category,
        countInStock: product.countInStock,
        description: product.description,
      });
    }
  }, [dispatch, productId, product, setValues]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setFieldValue('image', data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link to='/admin/product' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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

            <Form.Group className='mb-3' controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                className={errors.price && 'is-invalid'}
                placeholder='Price'
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
              ></Form.Control>
              {errors.price && (
                <div className='invalid-feedback'>{errors.price}</div>
              )}
            </Form.Group>

            <Form.Group className='mb-3' controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                className={errors.image && 'is-invalid'}
                placeholder='Image Url'
                value={values.image}
                onChange={handleChange}
                onBlur={handleBlur}
              ></Form.Control>
              <Form.Control
                id='image-file'
                type='file'
                className='form-control'
                label='Choose File'
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader size='sm' />}
              {errors.image && (
                <div className='invalid-feedback'>{errors.image}</div>
              )}
            </Form.Group>

            <Form.Group className='mb-3' controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                className={errors.brand && 'is-invalid'}
                placeholder='Brand'
                value={values.brand}
                onChange={handleChange}
                onBlur={handleBlur}
              ></Form.Control>
              {errors.brand && (
                <div className='invalid-feedback'>{errors.brand}</div>
              )}
            </Form.Group>

            <Form.Group className='mb-3' controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                className={errors.countInStock && 'is-invalid'}
                placeholder='Count in stock'
                value={values.countInStock}
                onChange={handleChange}
                onBlur={handleBlur}
              ></Form.Control>
              {errors.countInStock && (
                <div className='invalid-feedback'>{errors.countInStock}</div>
              )}
            </Form.Group>

            <Form.Group className='mb-3' controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                className={errors.category && 'is-invalid'}
                placeholder='Category'
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
              ></Form.Control>
              {errors.category && (
                <div className='invalid-feedback'>{errors.category}</div>
              )}
            </Form.Group>

            <Form.Group className='mb-3' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={5}
                className={errors.description && 'is-invalid'}
                placeholder='Description'
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              ></Form.Control>
              {errors.description && (
                <div className='invalid-feedback'>{errors.description}</div>
              )}
            </Form.Group>

            <div className='d-flex align-items-center'>
              <Button type='submit' variant='primary' disabled={updateLoading}>
                Update
              </Button>
              {updateLoading && <Loader inline size='sm' />}
            </div>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
