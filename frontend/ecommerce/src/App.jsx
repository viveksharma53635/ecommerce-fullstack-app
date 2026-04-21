import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import AddProduct from './pages/AddProduct';
import ProductDashboard from './pages/ProductDashboard';
import EditProduct  from './pages/EditProduct';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/products" element={<ProductDashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;