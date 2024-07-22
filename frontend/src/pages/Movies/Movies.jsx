import React from 'react'
import { useAllMoviesQuery } from '../../redux/api/movieApiSlice'
import { Link } from 'react-router-dom';

const Movies = () => {

    const {data: movies, isLoading, isError} = useAllMoviesQuery();
    if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (isError) {
        return <div>Error loading products</div>;
    }
    


  return (
    <div>
      <div> All Movies ({movies.length})</div>
      <div>
        {movies.map((movie) => (
           
            <div key={movie._id}>
            <div>
            <h5>
                {movie?.title}    
            </h5>     
            </div>

            <p>
                {movie?.synopsis}
            </p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Movies
