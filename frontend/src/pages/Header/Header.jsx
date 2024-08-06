import './Header.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import { logout } from '../../redux/features/auth/authSlice'
import { useLogoutMutation } from '../../redux/api/usersApiSlice'
import { AiOutlineShoppingCart} from 'react-icons/ai'


function Header(){

    const {userInfo} = useSelector(state => state.auth)    
    const [logoutApiCall] = useLogoutMutation()

    return(
        <>
            <ul>
                <li><Link to="/home" className='link'> Home </Link></li>
                <li><Link to="/movies" className='link'> Movies </Link></li>
            


                {userInfo ? (
                    <div className='nav-right'>
                        <li>
                        <Link to= '/cart' className="flex items-center transition-transform transform hover:translate-x-2 text-white" style={{ color: 'white', textDecoration: 'none' }}>

                            <AiOutlineShoppingCart className = "mr-2 mt-[3rem] text-white" size = {26}/>
                            <span className = "hidden nav-item-name mt-[3rem] text-white"> Cart</span> {" "}
                        </Link>
                        </li>
                        
                        <li>
                            <Link className = 'link' to="/userpage">
                            <span > {userInfo.username}</span>
                            </Link>
                            </li>      
                        </div>
                    ):
                    (
                <div className='nav-right'>
                
                <li ><Link to="/login" className='link'> Login </Link></li>
                <li><Link to="/register" className='link'> Register </Link></li>
                </div>
                    )
            }
            
                
                

            </ul>
        </>
    )
}

export default Header