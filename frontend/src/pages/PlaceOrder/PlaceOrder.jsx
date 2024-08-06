import React from 'react'
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderMutation } from '../../redux/api/orderApiSlice';
import { clearCartItems } from '../../redux/features/cart/cartSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import './PlaceOrder.css'

const PlaceOrder = () => {

  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
         <>
            <div className="placepage">
              <h1 className="Placetitle">Your Items</h1>

              
              {cart.cartItems.map((item) => (
                <div >
                <div key={item._id} className="cartItem" >
                  <div >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="imagepre"
                    />
                  </div>

                  <div  className="right-s">
                    <Link to={`/movie/${item._id}`} className="movie-title" >
                      {item.title}
                    </Link>

                 
                    <div className='right-place' >
                      $ {item.price}
                    </div>
                  </div>

                 
                </div>
                </div>
              
              ))}

        <div className='b-sect'>
          <h2 >Order Summary</h2>
          <div className='Ordertitle' >
            
              <p className='b-line'>
                <div className='b-que'>Items:</div> $
                {cart.itemsPrice}
              </p>
              <p className='b-line'>
                <div className='b-que'>Tax:</div> $
                {cart.taxPrice}
              </p>
              <p className='b-line'>
                <div className='b-que'>Total:</div> $
                {cart.totalPrice}
              </p>
          

            {error && <Message variant="danger">{error.data.message}</Message>}

          </div>
          <div className='button-section'>

          <button
            type="button"
            className="checkout-button"
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>
          </div>
          

          {isLoading && <Loader />}
        </div>
            </div>
          </>
      
    </div>
  )
}

export default PlaceOrder
