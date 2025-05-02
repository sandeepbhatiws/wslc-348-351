import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const initialState = {
  user_name: Cookies.get('user_name') ?? '',
  user_token: Cookies.get('user_token') ?? '',
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginRegister: (state, { payload }) => {

      console.log(payload)

      if(payload.user_token){
        state.user_token = payload.user_token
        Cookies.set('user_token', payload.user_token)
      }

      if(payload.user_name){
        state.user_name = payload.user_name
        Cookies.set('user_name', payload.user_name)
      }
    },
    logOut: (state) => {
      state.user_token = ''
      state.user_name = ''
      Cookies.remove('user_name')
      Cookies.remove('user_token')
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginRegister, logOut } = loginSlice.actions

export default loginSlice.reducer