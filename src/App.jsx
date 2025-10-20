import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AboutComp from './components/AboutComp'
import FooterComp from './components/FooterComp'
import NavbarComp from './components/NavbarComp'
import HomeLayout from './components/HomeLayout'
import ShopComp from './components/ShopComp'
import { useState } from 'react'
import ProductModal from './components/ProductModal'
import CartPage from './components/CartPage'

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cart,setCart]=useState([])

  const handleOpenModal = (product) => {
    setSelectedProduct(product)
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
    setShowModal(false)
  }
  const handleAddToCart = (product) => {
    setCart((prevCart)=>[...prevCart,product])
    console.log("Added to cart:", product);
  };
  return (
    <BrowserRouter>
      <NavbarComp />
      <Routes>
        <Route index element={<HomeLayout onProductClick={handleOpenModal}/>} />
        <Route path='/about' element={<AboutComp />} />
        <Route path='/shop' element={<ShopComp onProductClick={handleOpenModal}/>} />
        <Route path='/cartPage' element={<CartPage/>}/>
      </Routes>

      <ProductModal
        show={showModal}
        product={selectedProduct}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />
      <FooterComp />
    </BrowserRouter>


  )
}

export default App
