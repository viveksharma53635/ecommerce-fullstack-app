import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import AddProduct from './pages/AddProduct';
import ProductDashboard from './pages/ProductDashboard';
import EditProduct  from './pages/EditProduct';
import OrderDashboard from './pages/OrderDashboard';
import AddOrder from './pages/AddOrder';
import CartPage from './pages/CartPage';
import CustomerDashboard from './pages/CustomerDashboard';
import AddCustomer from './pages/AddCustomer';
import Register from './pages/Register';
import OrderHistory from './pages/OrderHistory';
import AccountSettings from './pages/AccountSettings';
import PaymentPage from './pages/PaymentPage';
import PaymentDashboard from './pages/PaymentDashboard';
import Wishlist from './pages/Wishlist';
import ShippingDashboard from './pages/ShippingDashboard';
import TrackShipment from './pages/TrackShipment';
import ProductReviews from './pages/ProductReviews';
import ReviewDashboard from './pages/ReviewDashboard';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/products" element={<ProductDashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/orders" element={<OrderDashboard />} />
        <Route path="/add-order" element={<AddOrder/>} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/customers" element={<CustomerDashboard />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/order-history" element={<OrderHistory/>} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payments" element={<PaymentDashboard />} />
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/shipping" element={<ShippingDashboard/>} />
        <Route path="/track-shipment" element={<TrackShipment />} />
        <Route path="/reviews" element={<ProductReviews />} />
        <Route path="/review-dashboard" element={<ReviewDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;