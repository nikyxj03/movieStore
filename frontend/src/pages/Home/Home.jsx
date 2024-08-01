import React from 'react'
import './Home.css'
import MovieCarousel from '../MovieCarousel/MovieCarousel'
const Home = () => {
  return (
    <div className='page'>
        <div className='head'> Movie Mania</div>
        <div className='carousel'><MovieCarousel/></div>
      
    </div>
  )
}

export default Home
