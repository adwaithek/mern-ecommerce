
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homepage/HomePage';
import About from './pages/about/About';
import Pagenotfound from './pages/pagenotfound/Pagenotfound';
import Policy from './pages/policy/Policy';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Dashboard from './pages/Auth/user/Dashboard';
import AdminDashboard from './pages/Admin/dashboard/AdminDashboard';
import PrivateRoute from './components/Routes/Private';
import CreateCategory from './pages/Admin/createcategory/Category';
import CreateProducts from './pages/Admin/createproduct/CreateProducts';
import Users from './pages/Admin/users/Users';
import AdminRoute from './components/Routes/AdminRoute';
import Order from './pages/Auth/user/Order';
import Profile from './pages/Auth/user/Profile';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Product from './pages/Admin/product/Product';
import UpdateProducts from './pages/Admin/updateProduct/UpdateProducts';
import Search from './pages/search/Search';
import ProductDetails from './pages/productdetails/ProductDetails';
import Categories from './pages/categories/Categories';
import CategoryProduct from './pages/categoryProduct/CategoryProduct';
import CartPage from './pages/cartpage/CartPage';
import AdminOrders from './pages/Admin/adminOrders/AdminOrders';
  

function App() {
  return (
    <>
   
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/search' element={<Search/>} />
          <Route path='/product/:slug' element={<ProductDetails/>} />

          <Route path='/categories' element={<Categories/>} />
          <Route path='/cart' element={<CartPage/>} />

          <Route path='/category/:slug' element={<CategoryProduct/>} />

          <Route path='/dashboard' element={<PrivateRoute/> }  >
          <Route path='user' element={<Dashboard />} />
          <Route path='user/orders' element={<Order/>} />
          <Route path='user/profile' element={<Profile />} />
          </Route>

          <Route path='/dashboard' element={<AdminRoute />}  >
            <Route path='admin' element={<AdminDashboard/> }  />
            <Route   path='admin/create-category' element={<CreateCategory/>}  />
            <Route   path='admin/create-product' element={<CreateProducts/>}  />
            <Route   path='admin/product/:slug' element={<UpdateProducts/>}  />

            <Route   path='admin/products' element={<Product/>}  />
            <Route   path='admin/users' element={<Users/>}  />
            <Route   path='admin/orders' element={<AdminOrders/>}  />

          </Route>



          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<HomePage />} />
          <Route path='/policy' element={<Policy />} />
          <Route path='*' element={<Pagenotfound />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/user' element={<Dashboard />} />
          <Route path='/user' element={<Dashboard />} />
          <Route path='/user' element={<Dashboard />} />
          <Route path='/admin' element={<AdminDashboard />} />

        </Routes>
   
    </>
  );
}

export default App;
