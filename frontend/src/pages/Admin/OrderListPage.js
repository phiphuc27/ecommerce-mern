import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import { getOrders } from '../../actions/orderActions';

const OrderListPage = ({ history, location }) => {
  const query = new URLSearchParams(location.search);

  const pageNum = query.get('page') || '';

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);

  const { orders, loading, error, page, pages } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/');
    } else {
      dispatch(getOrders(pageNum));
    }
  }, [dispatch, userInfo, history, pageNum]);

  return (
    <>
      <h1>Users</h1>
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
                <th>USER</th>
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
                    <td>{order.user && order.user.name}</td>
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
                    <td>
                      <LinkContainer
                        className='d-grid'
                        to={`/order/${order._id}`}
                      >
                        <Button variant='primary' className='btn-sm me-2'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} to='/admin/order' />
        </>
      )}
    </>
  );
};

export default OrderListPage;
