export const addFavoriteToLocalStorage = (movie) => {
    const favorites = getFavoritesFromLocalStorage();
    if (!favorites.some((m) => m._id === movie._id)) {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };
  
  // Remove  product from a localStorage
  export const removeFavoriteFromLocalStorage = (movieId) => {
    const favorites = getFavoritesFromLocalStorage();
    const updateFavorites = favorites.filter(
      (movie) => movie._id !== movieId
    );
  
    localStorage.setItem("favorites", JSON.stringify(updateFavorites));
  };
  
  // Retrive favorites from a localStorage
  export const getFavoritesFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem("favorites");
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
  };