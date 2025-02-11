import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ data, pageName }) {
    return (
        <>

            <div className={ (pageName == 'catolag') ? 'col-md-4' : 'col-md-3' }>
                <div class="card mb-3">
                    <Link to={`/product-details/${data.id}`} className='text-decoration-none text-black'>
                        <img src={data.image} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">{data.name}</h5>
                            <p class="card-text">Rs. {data.price}</p>
                            <a href="#" class="btn btn-primary">Add To Cart</a>
                        </div>
                    </Link>
                </div>
            </div>

        </>
    )
}
