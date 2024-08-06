import React from 'react'
import { useState, useEffect } from 'react'
import { Link,useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import '../Login/Login.css'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [login, {isLoading}] = useLoginMutation()

    const {userInfo} = useSelector((state) => state.auth)

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate,redirect,userInfo])

    const submitHandler = async(e) => {
        e.preventDefault()
        try{
            const res = await login({email, password}).unwrap()
            console.log(res)
            dispatch(setCredentials({...res}))
        } catch(error){
            toast.error(error?.data?.message || error.message)
        }
    } 



  return (
    <div className='box'>
        <h1>Login</h1>
      <form onSubmit={submitHandler} className='fill'>
      <div  className='l-line'>
                    <label className='l-que'
                    htmlFor="email" 
                    >
                    Email Address
                    </label>

                    <input className='l-ans' 
                    type="email" 
                    id = "email" 
                    
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                    />
                </div>

                <div  className='l-line'>
                    <label className='l-que'
                    htmlFor="password" 
                    >
                    Password
                    </label>

                    <input className='l-ans'
                    type="password" 
                    id = "password" 
                    
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                    />
                </div>


                <button className='press'
                disabled = {isLoading} 
                type = "submit" 
                > 
                {isLoading ? "Signing In..." : "Sign In"} 
                
                
                </button>

                {isLoading && <Loader />}

    
      </form>

    </div>
  )
}

export default Login
