import React, { useContext, useEffect, useState } from 'react'
import "../assets/css/cart.css"
import { CartContext } from '../Context API/CommonContext';
import { toast } from 'react-toastify';

export default function Cart() {

    const { cartItems, setCartItems } = useContext(CartContext);

    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        var sum = 0;
        cartItems.forEach((v,i) => {
            sum += v.price * v.quantity;
        })
        setCartTotal(sum);
    },[cartItems]);

    const cartDelete = (productId) => {
        if(confirm('Are you sure want to delete ?')){

            var cartData = cartItems.filter((v) => {
                if(v.id != productId){
                    return v;
                }
            })

            var finalData = [...cartData];


            setCartItems(finalData);
            localStorage.setItem('cartItems',JSON.stringify(finalData));
            toast.success('Delete cart successfully.',{
                autoClose: 1000,
            })
        }
    }

    const minusCart = (productId) => {
        const cartData = cartItems.map((v,i) => {
            if(v.id == productId){
                if(v.quantity > 1){
                    v.quantity--;

                    return v;
                } else {
                    return v;
                }
            } else {
                return v;
            }
        })

        setCartItems(cartData);
        localStorage.setItem('cartItems',JSON.stringify(cartData));
        // toast.success('Update cart successfully.',{
        //     autoClose: 1000,
        // })
    }

    const plusCart = (productId, stock) => {
        const cartData = cartItems.map((v,i) => {
            if(v.id == productId){
                if(v.quantity < stock){
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

        setCartItems(cartData);
        localStorage.setItem('cartItems',JSON.stringify(cartData));
    }

    return (
        <>
            <div class="container py-3">
                <h3>Shopping Cart</h3>
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-8">
                        {/* <!-- single cart item  --> */}
                        {
                            cartItems.map((v, i) => {
                                return (
                                    <>
                                        <hr />
                                        <div class="cart-item py-2">
                                            <div class="row">
                                                <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                                    <div class="d-flex justify-content-between mb-3">
                                                        <img
                                                            class="cart-image d-block"
                                                            src={ v.image }
                                                            alt={ v.name }
                                                        />
                                                        <div class="mx-3">
                                                            <h5>{ v.name }</h5>
                                                            <p>Lorem ipsum, dolor sit</p>
                                                            <h5>Rs. { v.price }</h5>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                                    <div class="d-flex justify-content-between">
                                                        <div>
                                                            <button onClick={ () => minusCart(v.id) } className='btn btn-primary me-2'>-</button>
                                                            
                                                            <button className='btn btn-info bg-transparent'>{ v.quantity }</button>

                                                            <button onClick={ () => plusCart(v.id, 6) } className='btn btn-primary ms-2'>+</button>
                                                        </div>

                                                        <div>
                                                            <h4>
                                                            Rs.{ v.price * v.quantity  }
                                                            </h4>
                                                        </div>
                                                        <div>
                                                            <button onClick={ () => cartDelete(v.id) }
                                                                type="button"
                                                                class="btn-close"
                                                                aria-label="Close"
                                                            ></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }



                        {/* <!-- ./ single cart item end  -->
                        <!-- single cart item  --> */}

                        <hr />
                        {/* <!-- ./ single cart item end  --> */}
                    </div>
                    <div class="col-12 col-sm-12 col-md-8 col-lg-4">
                        <div class="bg-light rounded-3 p-4">
                            <h6 class="mb-4">Order Summary</h6>
                            <div class="d-flex justify-content-between align-items-center">
                                <div>Subtotal</div>
                                <div><strong>Rs. { cartTotal }</strong></div>
                            </div>
                            <hr />
                            <div class="d-flex justify-content-between align-items-center">
                                <div>Delivery Charge</div>
                                <div><strong>Rs. 100</strong></div>
                            </div>
                            <hr />
                            <div class="d-flex justify-content-between align-items-center">
                                <div>Total</div>
                                <div><strong>Rs.5100</strong></div>
                            </div>
                            <button class="btn btn-primary w-100 mt-4">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
