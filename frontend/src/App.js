import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCarousel from './components/ProductCarousel';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import UserListPage from './pages/Admin/UserListPage';
import UserEditPage from './pages/Admin/UserEditPage';
import ProductListPage from './pages/Admin/ProductListPage';
import ProductEditPage from './pages/Admin/ProductEditPage';
import OrderListPage from './pages/Admin/OrderListPage';

const App = () => {
  return (
    <Router>
      <Header />
      <Route path='/' render={() => <ProductCarousel />} exact />
      <main className='py-3'>
        <Container>
          <Route path='/order/:id' component={OrderPage} exact />
          <Route path='/placeorder' component={PlaceOrderPage} exact />
          <Route path='/payment' component={PaymentPage} exact />
          <Route path='/shipping' component={ShippingPage} exact />
          <Route path='/login' component={LoginPage} exact />
          <Route path='/register' component={RegisterPage} exact />
          <Route path='/profile' component={ProfilePage} exact />
          <Route path='/product/:id' component={ProductPage} exact />
          <Route path='/cart/:id?' component={CartPage} exact />
          <Route path='/admin/user' component={UserListPage} exact />
          <Route path='/admin/user/:id/edit' component={UserEditPage} exact />
          <Route path='/admin/product' component={ProductListPage} exact />
          <Route
            path='/admin/product/:id/edit'
            component={ProductEditPage}
            exact
          />
          <Route path='/admin/order' component={OrderListPage} exact />
          <Route path='/search' component={HomePage} exact />
          <Route path='/' component={HomePage} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
