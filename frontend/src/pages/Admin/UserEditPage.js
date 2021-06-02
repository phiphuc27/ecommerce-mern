import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { getUserProfile, updateUser } from '../../actions/userActions';
import { USER_UPDATE_RESET } from '../../constants/userConstants';

const UserEditPage = ({ history, match }) => {
  const userId = match.params.id;

  const dispatch = useDispatch();

  const { loading, error, user, updateSuccess, updateLoading } = useSelector(
    (state) => state.user
  );

  const userEditSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    isAdmin: Yup.boolean(),
  });

  const { handleChange, handleBlur, handleSubmit, setValues, values, errors } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        name: '',
        email: '',
        isAdmin: false,
      },
      validationSchema: userEditSchema,
      onSubmit: (values) => {
        const { name, email, isAdmin } = values;
        dispatch(updateUser({ id: user._id, name, email, isAdmin }));
      },
    });

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/user');
    } else {
      if (!user || user._id !== userId) {
        dispatch(getUserProfile(userId));
      } else {
        setValues({
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
      }
    }
  }, [user, dispatch, userId, updateSuccess, history, setValues]);

  return (
    <>
      <Link to='/admin/user' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
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

            <Form.Group className='mb-3' controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={values.isAdmin}
                onChange={handleChange}
                onBlur={handleBlur}
              ></Form.Check>
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

export default UserEditPage;
