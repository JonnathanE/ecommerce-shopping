import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import { Success } from './pages/Success';
import { useSelector } from 'react-redux';

function Redirect({ to }) {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

function App() {
  const user = useSelector(state => state.user.currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductList />} >
          <Route path=':category' element={<ProductList />} />
        </Route>
        <Route path='/product/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/success' element={<Success />} />
        <Route path='/login' element={user ? <Redirect to="/" /> : <Login />} />
        <Route path='/register' element={user ? <Redirect to="/" /> : <Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
