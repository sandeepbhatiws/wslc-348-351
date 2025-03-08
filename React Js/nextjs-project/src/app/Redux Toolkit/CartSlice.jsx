import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

var getCartData = JSON.parse(localStorage.getItem('cartItems'));
var getCartData = getCartData ? getCartData : [];

const initialState = {
  cartItems: getCartData,
}

export const cartSlice = createSlice({
  name: 'allCartValues',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      var checkCart = state.cartItems.filter((v, i) => {
        if (v.id == action.payload.id) {
          return v;
        }
      })

      if (checkCart.length == 0) {
        const cartData = {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          image: action.payload.image,
          quantity: 1
        }

        var finalData = [cartData, ...state.cartItems];
        state.cartItems = finalData;
        toast.success('Add to cart successfully.', {
          autoClose: 1000,
        })
        localStorage.setItem('cartItems', JSON.stringify(finalData));
      } else {
        var finalData = state.cartItems.map((v, i) => {
          if (v.id == action.payload.id) {
            v.quantity++;
            return v;
          } else {
            return v;
          }
        })

        state.cartItems = finalData;
        localStorage.setItem('cartItems', JSON.stringify(finalData));
        toast.success('Update cart successfully.', {
          autoClose: 1000,
        })
      }
    },

    deleteCart: (state, action) => {
      if (confirm('Are you sure want to delete ?')) {

        var cartData = state.cartItems.filter((v) => {
          if (v.id != action.payload) {
            return v;
          }
        })

        var finalData = [...cartData];

        state.cartItems = finalData;
        localStorage.setItem('cartItems', JSON.stringify(finalData));
        toast.success('Delete cart successfully.', {
          autoClose: 1000,
        })
      }
    },

    updateCart: (state, action) => {
      if (action.payload.type == 'minus') {
        const cartData = state.cartItems.map((v, i) => {
          if (v.id == action.payload.id) {
            if (v.quantity > 1) {
              v.quantity--;

              return v;
            } else {
              return v;
            }
          } else {
            return v;
          }
        })

        state.cartItems = cartData;
        localStorage.setItem('cartItems', JSON.stringify(cartData));
      } else {
        console.log(action.payload.stock)
        const cartData = state.cartItems.map((v, i) => {
          if (v.id == action.payload.id) {
            if (v.quantity < 5) {
              v.quantity++;

              return v;
            } else {
              toast.error('maximun Quantity Reached')
              return v;
            }
          } else {
            return v;
          }
        })

        state.cartItems = cartData;
        localStorage.setItem('cartItems', JSON.stringify(cartData));
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, deleteCart, updateCart } = cartSlice.actions

export default cartSlice.reducer