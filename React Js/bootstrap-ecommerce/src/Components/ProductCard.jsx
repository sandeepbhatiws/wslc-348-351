import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../Context API/CommonContext'
import { toast } from 'react-toastify';

export default function ProductCard({ data, pageName }) {

    const { cartItems, setCartItems } = useContext(CartContext);

    const addToCart = (productInfo) => {

        var checkCart = cartItems.filter((v,i) => {
            if(v.id == productInfo.id){
                return v;
            }
        })

        if(checkCart.length == 0){
            const cartData = {
                id : productInfo.id,
                name : productInfo.name,
                price : productInfo.price,
                image : productInfo.image,
                quantity : 1
            }
    
            var finalData = [cartData, ...cartItems];
            setCartItems(finalData);
            toast.success('Add to cart successfully.',{
                autoClose: 1000,
            })
            localStorage.setItem('cartItems',JSON.stringify(finalData));
        } else {
            var finalData = cartItems.map((v,i) => {
                if(v.id == productInfo.id){
                    v.quantity++;
                    return v;
                } else {
                    return v;
                }
            })

            setCartItems(finalData);
            localStorage.setItem('cartItems',JSON.stringify(finalData));
            toast.success('Update cart successfully.',{
                autoClose: 1000,
            })
        }

        
    }

    return (
        <>

            <div className={ (pageName == 'catolag') ? 'col-md-4' : 'col-md-3' }>
                <div class="card mb-3">
                    <Link to={`/product-details/${data.id}`} className='text-decoration-none text-black'>
                        <img src={data.image} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">{data.name}</h5>
                            <p class="card-text">Rs. {data.price}</p>
                            
                        </div>
                    </Link>
                    <div class="card-body">
                        <button class="btn btn-primary" onClick={ () => addToCart(data) }>Add To Cart</button>
                    </div>
                </div>
            </div>

        </>
    )
}
