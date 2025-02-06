import React from 'react'
import Header from './Header'
import Slider from './Slider'
import ProductSection from './ProductSection'

export default function Home() {
  return (
    <>
      <Header/>

      <Slider/>

      <ProductSection heading="Best Selling Products"/>

      <ProductSection heading="Top Rated Products"/>
    </>
  )
}
