import React from 'react';
import { useAllMoviesQuery } from '../../redux/api/movieApiSlice';
import FilterCarousel from '../FilterCarousel/FilterCarousel';
import './Movies.css'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState } from 'react';



const Movies = () => {

  const [selectedFilter, setSelectedFilter] = useState('All');

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  

  const { data: movies, isLoading, isError } = useAllMoviesQuery();

  const genres = ['Action', 'Comedy', 'Sci-fi', 'Thriller', 'Drama'];
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !movies) {
    return <div>Error loading movies</div>;
  }

  const filteredMoviesByType = movies.filter((movie) => {
    if (selectedFilter === 'All') {
      return true;
    }
    return movie.category === selectedFilter;
  });

  console.log(filteredMoviesByType)

  return (
    <div>
      <div>
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '100px',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup size="large" aria-label="Large button group">
      <Button key="all" onClick={() => handleFilterChange('All')} className='netflix-button'>
              All
            </Button>
            <Button key="buy" onClick={() => handleFilterChange('Buy')} className='netflix-button'>
              Buy
            </Button>
            <Button key="free" onClick={() => handleFilterChange('Free')} className='netflix-button'>
              Free
            </Button>
      </ButtonGroup>
    </Box>
      </div>
    <div className='movie-line-container'>
      {genres.map(genre => {
        const filteredMovies = filteredMoviesByType.filter(movie => movie.genre === genre);

        return (
          <div key={genre} className='genre-title'>
            
            {filteredMovies.length > 0 ? (
              <div className='filter-line'>{genre}
              <FilterCarousel movies={filteredMovies} />
              </div>
            ) : (
              <p>Nothing to display</p>
            )}
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default Movies;
