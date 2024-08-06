import React from 'react'
import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useRegisterMutation } from '../../redux/api/usersApiSlice'
import Loader from '../../components/Loader'
import { setCredentials } from '../../redux/features/auth/authSlice'
import '../Register/Register.css'

const Register = () => {

  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register, {isLoading}] = useRegisterMutation()
  const {userInfo} = useSelector((state) => state.auth)

  const {search} = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'
  
  useEffect(() => {
      if (userInfo) {
        navigate(redirect);
      }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
      e.preventDefault();
  
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
      } else {
        try {
          const res = await register({ username, email, password }).unwrap();
          dispatch(setCredentials({ ...res }));
          navigate('/');
          toast.success("User successfully registered");
        } catch (err) {
          console.log(err);
          toast.error(err.data.message);
        }
      }
    };


  return(
    <>
    <div className='box'>
    <h1>Register</h1>
    <form onSubmit={submitHandler} className='fill' >
      <div className='r-line'>
        <label htmlFor="name" className='r-que'> Username </label>
        <input className="r-ans"type="text" placeholder='Enter Username' value={username} onChange={e => setUserName(e.target.value)}/>
      </div>

      <div className='r-line'>
        <label htmlFor="email" className='r-que'> Email </label>
        <input className="r-ans" type="email" placeholder='Enter Email' value={email} onChange={e => setEmail(e.target.value)}/>
      </div>

      <div className='r-line'>
        <label htmlFor="password" className='r-que'>Password</label>
        <input className="r-ans" type="password" placeholder='Enter Password' value={password} onChange={e => setPassword(e.target.value)}/>
      </div>

      <div className='r-line'> 
        <label htmlFor="consfirmPassword" className='r-que'> Confirm Password</label>
        <input className="r-ans" type="password" placeholder='Enter Password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
      </div>

      <button className="press" disabled = {isLoading} 
            type = "submit" >
             {isLoading ? "Registering....." : "Register"}
            </button>

      {isLoading && <Loader/>}

    </form>
    </div>
    </>
  )
}

export default Register
