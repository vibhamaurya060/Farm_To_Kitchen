
import { Route, Routes } from 'react-router'
import './App.css'
import Signup from './Pages/Signup'
import Login from './pages/Login'
import Home from './Pages/Home'
import Navbar from './components/Navbar'
import Products from './Pages/Products'
import CartPage from './Pages/CartPage'
import CheckoutPage from './Pages/CheckoutPage'
import SuccessPage from './Pages/SuccessPage'
import ProductDetail from './Pages/ProductDetail'
import NotFound from './Pages/NotFound'



function App() {

  return (
    <>
      {/* <p>Frontend</p> */}
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </>

  )
}

export default App
