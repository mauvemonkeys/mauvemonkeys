import React from 'react'

const Product = ({product, handleClick}) => {
  return (
    <div className="product-item">
      <div id="backgroundimg">
        <img src={product.imageUrl} onClick={() => handleClick(product.id)} />
      </div>
      <div>
        <h3 onClick={() => handleClick(product.id)}>{product.name}</h3>
      </div>
      <div>${product.price}</div>
    </div>
  )
}

export default Product
