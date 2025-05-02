import React, { useEffect, useState } from 'react'
import Header from './Header'
import Slider from './Slider'
import ProductSection from './ProductSection'
import axios from 'axios';

export default function Home() {

  const [bestSelling, setBestSelling] = useState([]);
  const [topRating, setTopRating] = useState([]);

  useEffect(() => {
    axios.get(`https://wscubetech.co/ecommerce-api/products.php?categories=furniture,home-decoration&limit=8`)
    .then((response) => {
      setBestSelling(response.data.data)
    })
    .catch((error) => {
        console.log('Soemthing went wrong. Please try again !!');
    })
  },[]);

  useEffect(() => {
    axios.get(`https://wscubetech.co/ecommerce-api/products.php`,{
      params : {
        categories : 'mens-shirts,mens-shoes',
        limit : 8
      }
    })
    .then((response) => {
      setTopRating(response.data.data)
    })
    .catch((error) => {
        console.log('Soemthing went wrong. Please try again !!');
    })
  },[]);

  return (
    <>
      {/* <Header/> */}

      <Slider/>

      <ProductSection heading="Best Selling Products" products={bestSelling}/>

      <ProductSection heading="Top Rated Products" products={topRating}/>
    </>
  )
}
