import React from 'react'
import { useGetOrderDetailsQuery } from '../../redux/api/orderApiSlice'
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { useSelector } from 'react-redux';
import './Order.css'

const Order = () => {
    const {id : orderId} = useParams()

    const {
        data:order,
        isLoading,
        error,
    } = useGetOrderDetailsQuery(orderId)

    const { userInfo } = useSelector((state) => state.auth);


    

  return isLoading ? (<Loader/>): error ?(
    <Message variant="danger">{error.data.message}</Message>
  ):(
    <div >
      <div >
        <div >
          {order.orderItems.length === 0 ? (
            <Message>Order is empty</Message>
          ) : (
            <div className='orderpage' >
                <div className='Ordertitle'>Order Summary</div>
                <div>
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="orderItem" > 
                      <div >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="imageprev"
                        />
                      </div>

                      <div  className="right-sect">
                        <Link to={`/movie/${item.movie}`} className="movie-title">{item.title}</Link>
                      </div>

                      
                      <div className='right-section'>
                        $ {(item.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          
          )}
        </div>
      </div>

      <div className="bottom-sect">

        <div className='Ordertitle'>Billing Summary</div>
        <div className='o-line'>
          <div className='o-que'>Items Price</div>
          <div>$ {order.itemsPrice}</div>
        </div>
        <div  className='o-line'>
          <div className='o-que'>Tax</div>
          <div>$ {order.taxPrice}</div>
        </div>
        <div  className='o-line'>
          <div className='o-que'><b>Total</b></div>
          <div><b>$ {order.totalPrice}</b></div>
        </div>
      </div>
    </div>
  )
}

export default Order
