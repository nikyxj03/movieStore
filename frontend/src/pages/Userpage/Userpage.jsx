import React from 'react'
import Sidebar from '../SideBar/Sidebar'
import { useProfileMutation } from '../../redux/api/usersApiSlice'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"
import { Link } from "react-router-dom"
import { setCredentials } from '../../redux/features/auth/authslice'

const Userpage = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [ password, setPasword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
  
    const {userInfo} = useSelector((state) => state.auth)
  
    const [updateProfile, {isLoading : loadingUpdateProfile}] = useProfileMutation()

    useEffect(() => {
        setUsername(userInfo.username)
        setEmail(userInfo.email)
        
      }, [userInfo.email, userInfo.username])
  
    const dispatch = useDispatch()
     
    const submitHandler = async(e) => {
        e.preventDefault()
    
        if(password !== confirmPassword){
          toast.error('Passwords do not match')
        } else{
          try {
            const res = await updateProfile({_id : userInfo._id, username, email, password}).unwrap()
            dispatch(setCredentials({...res}))
            toast.success('Profile updated successfully')
          } catch (error) {
            toast.error(error?.data?.message || error.message)
          }
        }
      }

  
      return (
    <div>
        <Sidebar/>

        <div className='box'>
        <h1>Update Profile</h1>
            <form onSubmit={submitHandler} className='fill'>
                <div className='line'>
                    <label className='que'> Name </label>
                    <input className='ans' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className='line'>
                    <label className='que'> Email </label>
                    <input className='ans' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className='line'>
                    <label className='que'> Password </label>
                    <input className='ans' type="password" value={password} onChange={(e) => setPasword(e.target.value)} />
                </div>

                <div className='line'>
                    <label className='que'> Confirm Password </label>
                    <input className='ans' type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>

                <div>
                    <button type='submit' className='press'
                >
                        Update
                    </button>

                </div>
            </form>
        </div>
        {loadingUpdateProfile && <Loader/>}


      
    </div>
  )
}

export default Userpage
