import React from 'react'
import ShopCorousel from './ShopCorousel'
import ShopProducts from './ShopProducts'

const ShopComp = ({ onProductClick }) => {
  return (
    <div>
      <ShopCorousel />
      <ShopProducts onProductClick={onProductClick} />
    </div>
  )
}

export default ShopComp