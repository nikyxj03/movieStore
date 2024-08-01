import React from 'react'
import './Home.css'
import MovieCarousel from '../MovieCarousel/MovieCarousel'
const Home = () => {
  return (
    <div className='page'>
        <div className='head'> Welcome to Movie Mania</div>
        <div><MovieCarousel/></div>
      
    </div>
  )
}

export default Home
