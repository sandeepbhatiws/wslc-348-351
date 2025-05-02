import React, { createContext, useState } from 'react'

const CartContext = createContext();

export default function CommonContext({ children }) {

    var getCartItems = JSON.parse(localStorage.getItem('cartItems'))

    const [cartItems, setCartItems] = useState((getCartItems) ? getCartItems : [] );
    const [wishlistItems, setWishlistItems] = useState([]);

    const addToCart = () => {

    }

    var data = { cartItems, setCartItems, wishlistItems, setWishlistItems, addToCart }

  return (
    <CartContext.Provider value={data}>
        { children }
    </CartContext.Provider>
  )
}


export { CartContext };