import React from 'react'
import { useEffect } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { addToFavorites, 
    removeFromFavorites, setFavorites
 } from '../redux/features/favorites/favoriteSlice'
import { addFavoriteToLocalStorage, getFavoritesFromLocalStorage, removeFavoriteFromLocalStorage } from '../utils/localStorage'

const HeartIcon = ({movie}) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites) || [];
    const isFavorite = favorites.some((m) => m._id === movie._id);
  
    useEffect(() => {
      const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
      dispatch(setFavorites(favoritesFromLocalStorage));
    }, []);
  
    const toggleFavorites = () => {
      if (isFavorite) {
        dispatch(removeFromFavorites(movie));
       
        removeFavoriteFromLocalStorage(movie._id);
      } else {
        dispatch(addToFavorites(movie));
        
        addFavoriteToLocalStorage(movie);
      }
    };
  
    return (
      <div
        className="absolute top-2 right-5 cursor-pointer"
        onClick={toggleFavorites}
      >
        {isFavorite ? (
          <FaHeart className="text-pink-500 " />
        ) : (
          <FaRegHeart className="text-white" />
        )}
      </div>
    );
}

export default HeartIcon