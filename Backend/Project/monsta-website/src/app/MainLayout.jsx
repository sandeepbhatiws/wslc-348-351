"use client";

import React from 'react'
import { Provider } from 'react-redux'
import { store } from './ReduxToolkit/store'

export default function MainLayout({children}) {
  return (
    <>
    <Provider store={store}>
    { children }
    </Provider>
      
    </>
  )
}
