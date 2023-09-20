import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  removeCartItem: () => {},
  removeAllCartItems: () => {},
  addCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
