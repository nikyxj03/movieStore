import React from 'react'
import HeartIcon from '../HeartIcon'
import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useGetMovieDetailsQuery } from '../../redux/api/movieApiSlice'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import moment from 'moment'
import './MovieDetails.css'


const MovieDetails = () => {
    const {id: movieId} = useParams()
    
    const {
        data,
        isLoading,
        error,
    } = useGetMovieDetailsQuery(movieId)

    const { movie } = data || {};

    

    const {userInfo} = useSelector(state => state.auth)

    console.log('movieId:', movieId);
    console.log('movie:', movie);
    return (
        <>
          <div className='container' > 
            <Link to="/home" className='go-back-link'>Go Back</Link>
    
            {isLoading ? (
              <Loader className='loader'/>
            ) : error ? (
              <Message variant="danger">
                {error?.data?.message || error.message}
              </Message>
            ) : movie ? (
              <div className="movie-details">
                <div>
                  <img src={movie.image} alt={movie.title} />
                </div>
    
                <div className="movie-info">
                  <h1>{movie.title}</h1>
                  <p>{movie.synopsis}</p>
                  <p>${movie.price}</p>
                  <div>
                    <div className="movie-genre-actor">
                      <h2>Genre: {movie.genre}</h2>
                      <h2>Actor: {movie.actor}</h2>
                      <h2>Actress: {movie.actress}</h2>
                      <h2>Director: {movie.director}</h2>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Message variant="info">No movie details found</Message>
            )}
          </div>
        </>
      );
    };
    
    export default MovieDetails