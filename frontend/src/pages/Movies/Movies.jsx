import React from 'react';
import { useAllMoviesQuery } from '../../redux/api/movieApiSlice';
import FilterCarousel from '../FilterCarousel/FilterCarousel';
import './Movies.css'

const Movies = () => {
  const { data: movies, isLoading, isError } = useAllMoviesQuery();

  const genres = ['Action', 'Comedy', 'Sci-fi', 'Thriller', 'Drama', 'Biography'];
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !movies) {
    return <div>Error loading movies</div>;
  }

  return (
    <div className='container'>
      {genres.map(genre => {
        const filteredMovies = movies.filter(movie => movie.genre === genre);
        return (
          <div key={genre} className='line'>
            <div className='title'>{genre}</div>
            {filteredMovies.length > 0 ? (
              
              <FilterCarousel movies={filteredMovies} />
            ) : (
              <p>Nothing to display</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Movies;
