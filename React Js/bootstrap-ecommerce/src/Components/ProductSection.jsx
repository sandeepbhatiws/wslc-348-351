import React, { useState } from 'react'
import ProductCard from './ProductCard'

export default function ProductSection({ heading, products }) {


    return (
        <>
            <div className='conatiner-fluid'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 text-center p-5 product-heading'>
                            <h1 className='d-inline border-gray p-2'>{heading}</h1>
                        </div>
                    </div>
                    <div className='row text-center gy-4 pb-5'>

                        {
                            products.map((v, i) => {
                                return (
                                    <ProductCard key={i} data={v} />
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
