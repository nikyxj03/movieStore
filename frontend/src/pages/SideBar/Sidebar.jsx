import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import { useLogoutMutation } from '../../redux/api/usersApiSlice'
import { useSelector, useDispatch } from "react-redux"
import { logout } from '../../redux/features/auth/authSlice'
import { useNavigate } from "react-router-dom"

const Sidebar = () => {
    const {userInfo} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutApiCall] = useLogoutMutation()
    const logoutHandler = async() => {
        try{
            await logoutApiCall().unwrap();
            dispatch(logout())
            navigate('/login')

        }catch(error){
            console.error(error)
        }
    }

  return (
    
    <div className='side'>
        {userInfo.isAdmin && (
            <>
            <div className='option'> 
            <Link className = 'link' to='/admin/movieslist'>
                Movies
            </Link>
            </div>
            <div className='option'>
            <Link className = 'link' to='/admin/userslist'  >
                Users
            </Link>
            </div>
            
            </>
        )}

        

        <div className='option'>
            <Link className = 'link' to="/userpage">
            Profile
            </Link>
            
        </div>
        
        
        <div  className='option'>
        <Link className = 'link' to = '/admin/logout' 
                            onClick={logoutHandler}
                            >
                                Logout
                            </Link>
        </div>
        

        

    </div>
  )
}

export default Sidebar
