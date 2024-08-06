import React from 'react'
import { useAllMoviesQuery } from '../../redux/api/movieApiSlice'
import { useState,useEffect } from 'react'
import FilterCarousel from '../FilterCarousel/FilterCarousel'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useGetMovieDetailsQuery, useCreateReviewMutation } from '../../redux/api/movieApiSlice'
import Message from '../../components/Message'
import Loader from '../../components/Loader'

import './MovieDetails.css'
import MovieTabs from '../MovieTabs/MovieTabs.jsx'
import {addToCart} from '../../redux/features/cart/cartSlice.js'


const MovieDetails = () => {
    const {id: movieId} = useParams()
    const { data: movies } = useAllMoviesQuery();
    
    const navigate  = useNavigate()
    const dispatch = useDispatch()
    const[rating, setRating] = useState(0)
    const[comment, setComment] = useState('')
   
    const {
        data,
        isLoading,
        refetch,
        error,
    } = useGetMovieDetailsQuery(movieId)
    
    const {movie} = data || {};
    const filteredMovies = movie && movies ? movies.filter(m => m.genre === movie.genre) : [];
   

    const handleWatchClick = (title) => {
      const query = encodeURIComponent(title);
      const googleSearchUrl = `https://www.google.com/search?q=${query}`;
      window.open(googleSearchUrl, '_blank');
    };



    const {userInfo} = useSelector(state => state.auth)
    const [createReview, {isLoading: loadingMovieReview}] = useCreateReviewMutation()

    const submitHandler = async (e) => {
      e.preventDefault();
  
      try {
        await createReview({
          movieId,
          rating,
          comment,
        }).unwrap();
        refetch();
        toast.success("Review created successfully");
      } catch (error) {
        toast.error(error?.data || error.message);
      }
    };


    const addToCartHandler = () => {
      dispatch(addToCart({...movie}))
      navigate('/cart')
    }

    if (isLoading) {
      
      return <Loader className='loader' />;
      
    }
  
    if (error) {
      return <Message variant="danger">{error?.data?.message || error.message}</Message>;
    }

    return (

        <>
        <div className='fullbox'>
          <div className='container' > 
            <Link to="/home" className='go-back-link'>Go Back</Link>
    
             {movie ? (
              <div className='movie-section'>
              <div className="movie-details">
                <div>
                  <img src={movie?.image} alt={movie.title} />
                </div>
    
                <div className="movie-info">
                  <h1>{movie?.title}</h1>
                  <p>{movie?.synopsis}</p>
                  <p><b>Price:</b> ${movie.price}</p>
                  <div>
                   
                    <div className="movie-genre-actor">
                      <p><b>Genre:</b> {movie?.genre}</p>
                      <p><b>Actor:</b> {movie?.actor}</p>
                      <p><b>Actress:</b> {movie?.actress}</p>
                      <p><b>Director:</b>{movie?.director}</p>
                    </div>
                  </div>
                </div>                 
              </div>
              <div className='button-section'>
              <button className='netflix-button'  onClick={addToCartHandler} >Add to Cart</button>
              <button className='netflix-button' onClick={() => handleWatchClick(movie.title)}>Watch </button>
              </div>
              </div>
            ) : (
              <Message variant="info">No movie details found</Message>
            )}
          </div>

          <div className='tabs'>
            <MovieTabs
            loadingMovieReview = {loadingMovieReview}
            userInfo = {userInfo}
            submitHandler = {submitHandler}
            rating = {rating}
            setRating = {setRating}
            comment = {comment}
            setComment = {setComment}
            movie = {movie}
            
            
            />
          </div>

           <div className="related"> 
            <div className='relatedtit'>Related Movies</div>
                  <FilterCarousel movies={filteredMovies} />
                </div>
              
                </div> 
        </>
      );
    };
    
export default MovieDetails;