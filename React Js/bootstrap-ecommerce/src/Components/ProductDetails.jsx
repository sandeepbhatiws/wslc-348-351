import React, { useEffect, useState } from 'react'
import Header from './Header'
import '../assets/css/product_details.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {

    const [productDetails, setProductDetails] = useState('');
    const [currentImage, setCurrentImage] = useState('');
    const [multipleImages, setMultipleImages] = useState([]);


    const params = useParams();

    useEffect(() => {
        axios.get(`https://wscubetech.co/ecommerce-api/productdetails.php?id=${params.id}`)
            .then((response) => {
                setProductDetails(response.data.product)
                setCurrentImage(response.data.product.multiple_images[0])
                setMultipleImages(response.data.product.multiple_images)
            })
            .catch((error) => {
                console.log('Soemthing went wrong. Please try again !!');
            })
    }, []);

    const changeImage = (image) => {
        setCurrentImage(image);
    }

    return (
        <>
            { 
                (productDetails != '')

                ?
                <div className='container-fluid'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 mb-5'>
                                <div class="card-wrapper">
                                    <div class="cardd">
                                        {/* <!-- card left --> */}
                                        <div class="product-imgs">
                                            <div class="img-display">
                                                <div class="img-showcase">
                                                    <img src={ currentImage } alt="shoe image" />
                                                </div>
                                            </div>
                                            <div class="img-select">

                                                {
                                                    multipleImages.map((v,i) => {
                                                        return(
                                                            <div class="img-item" onMouseOver={ () => changeImage(v) }>
                                                                <a data-id="1">
                                                                    <img src={v} alt="shoe image" />
                                                                </a>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                
                                                
                                                
                                            </div>
                                        </div>
                                        {/* <!-- card right --> */}
                                        <div class="product-content">
                                            <h2 class="product-title">{ productDetails.name }</h2>
                                            <a href="#" class="product-link">{ productDetails.brand }</a>
                                            <div class="product-rating">
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star-half-alt"></i>
                                                <span>4.7(21)</span>
                                            </div>

                                            <div class="product-price">
                                                <p class="last-price">Old Price: <span>$257.00</span></p>
                                                <p class="new-price">New Price: <span>Rs. { productDetails.price} ({ productDetails.discount_percentage}%)</span></p>
                                            </div>

                                            <div class="product-detail">
                                                <h2>about this item: </h2>
                                                <p>{ productDetails.description }</p>
                                                <ul>
                                                    <li>Color: <span>Black</span></li>
                                                    <li>Available: <span>in stock</span></li>
                                                    <li>Category: <span>Shoes</span></li>
                                                    <li>Shipping Area: <span>All over the world</span></li>
                                                    <li>Shipping Fee: <span>Free</span></li>
                                                </ul>
                                            </div>

                                            <div class="purchase-info">
                                                <input type="number" min="0" value="1" />
                                                <button type="button" class="btn">
                                                    Add to Cart <i class="fas fa-shopping-cart"></i>
                                                </button>
                                                <button type="button" class="btn">Compare</button>
                                            </div>

                                            <div class="social-links">
                                                <p>Share At: </p>
                                                <a href="#">
                                                    <i class="fab fa-facebook-f"></i>
                                                </a>
                                                <a href="#">
                                                    <i class="fab fa-twitter"></i>
                                                </a>
                                                <a href="#">
                                                    <i class="fab fa-instagram"></i>
                                                </a>
                                                <a href="#">
                                                    <i class="fab fa-whatsapp"></i>
                                                </a>
                                                <a href="#">
                                                    <i class="fab fa-pinterest"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                ''
            }
            

        </>
    )
}
