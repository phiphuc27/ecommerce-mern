import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBar';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ms-auto'>
              <Nav.Item>
                <LinkContainer to='/cart'>
                  <Nav.Link>
                    <i className='fas fa-shopping-cart'></i> Cart
                  </Nav.Link>
                </LinkContainer>
              </Nav.Item>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  {userInfo.isAdmin && (
                    <>
                      <LinkContainer to='/admin/user'>
                        <NavDropdown.Item>User Management</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/product'>
                        <NavDropdown.Item>Product Management</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/order'>
                        <NavDropdown.Item>Order Management</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown title='Account' id='account'>
                  <LinkContainer to='/register'>
                    <NavDropdown.Item>Sign Up</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/login'>
                    <NavDropdown.Item>Sign In</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
