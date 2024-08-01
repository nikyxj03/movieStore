import './Header.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import { logout } from '../../redux/features/auth/authslice'
import { useLogoutMutation } from '../../redux/api/usersApiSlice'
import { FaHeart } from 'react-icons/fa'
import FavoritesCount from '../Favorites/FavoritesCount'

function Header(){

    const {userInfo} = useSelector(state => state.auth)    
    const [logoutApiCall] = useLogoutMutation()

    return(
        <>
            <ul>
                <li><Link to="/home" className='link'> Home </Link></li>
                <li><Link to="/movies" className='link'> Movies </Link></li>
                <li>About us</li>



                {userInfo ? (
                    <div className='nav-right'>
                        <li> <Link to= '/favorite'>
                <FaHeart size = {26}/>
                
                <FavoritesCount/>
                </Link></li>
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