import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const initialState = {
  user_name : Cookies.get('user_name') ?? '',
  user_token : Cookies.get('user_token') ?? '',
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginRegister: (state, {payload}) => {
        console.log(payload);
        state.user_token = payload.token
    },
    logout: (state) => {

    },
  },
})

// Action creators are generated for each case reducer function
export const { loginRegister, logout } = loginSlice.actions

export default loginSlice.reducer