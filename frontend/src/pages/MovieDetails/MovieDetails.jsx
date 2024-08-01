import React from 'react'
import { useAllMoviesQuery } from '../../redux/api/movieApiSlice'
import { useState } from 'react'
import FilterCarousel from '../FilterCarousel/FilterCarousel'
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
    const { data: movies } = useAllMoviesQuery();
    const {
        data,
        isLoading,
        error,
    } = useGetMovieDetailsQuery(movieId)

    const { movie } = data || {};

    const filteredMovies = movie && movies ? movies.filter(m => m.genre === movie.genre) : [];
    console.log("Filtered movies",filteredMovies)
    
    const handleWatchClick = (title) => {
      const query = encodeURIComponent(title);
      const googleSearchUrl = `https://www.google.com/search?q=${query}`;
      window.open(googleSearchUrl, '_blank');
    };

    const {userInfo} = useSelector(state => state.auth)

    console.log('movieId:', movieId);
    console.log('movie:', movie);
    return (
        <>
        <div className='fullbox'>
          <div className='container' > 
            <Link to="/home" className='go-back-link'>Go Back</Link>
    
            {isLoading ? (
              <Loader className='loader'/>
            ) : error ? (
              <Message variant="danger">
                {error?.data?.message || error.message}
              </Message>
            ) : movie ? (
              <div className='movie-section'>
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

              <div className='button-section'>
              <button className='netflix-button'>Add to Cart</button>
              <button className='netflix-button' onClick={() => handleWatchClick(movie.title)}>Watch </button>
              </div>

              </div>
            ) : (
              <Message variant="info">No movie details found</Message>
            )}
          </div>

          <div className="related"> 
            <div className='relatedtit'>Related Movies</div>
                  <FilterCarousel movies={filteredMovies} />
                </div>

                </div>
        </>
      );
    };
    
    export default MovieDetails