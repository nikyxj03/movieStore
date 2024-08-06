import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import {addToCart, removeFromCart } from "../../redux/features/cart/cartSlice";
import './Cart.css'

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (movie, qty) => {
    dispatch(addToCart({ ...movie, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/placeorder");
  };

  return (
    <>
      <div >
        {cartItems.length === 0 ? (
          <>
          <div>
            Your cart is empty 
          </div>
          <div>
            <Link to="/home">Go To Home</Link>
            </div>
            </>
        ) : (
          <>
            <div className="cartPage">
              <h1 className="Shoptitle">Shopping Cart</h1>

              
              {cartItems.map((item) => (
                <div >
                <div key={item._id} className="cartItem" >
                  <div >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="imagepre"
                    />
                  </div>

                  <div  className="right-sec">
                    <Link to={`/movie/${item._id}`} className="movie-title" >
                      {item.title}
                    </Link>

                    <div >{item.category}</div>
                    <div >
                      $ {item.price}
                    </div>
                  </div>

                 
                  <div className="trashsec">
                    <button
                     
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="ml-[1rem] mt-[.5rem]" />
                    </button>
                  </div>
                </div>
                </div>
              
              ))}

              <div className="bottom-sec">
                <div className="move-right">
                  <h2 className="h2cart" >
                    Items ({cartItems.length})
                  </h2>

                  <div  className="price-sec">
                    ${" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.price, 0)
                      .toFixed(2)}
                  </div>
                  
                  <div className="buttsec">
                  <button
                    
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                    className="checkout-butt"
                  >
                    Proceed To Checkout
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;