import { useSelector } from "react-redux";
import { selectFavoriteMovie } from "../../redux/features/favorites/favoriteSlice";
import Movie from "../Movie/Movie"

const Favorites = () => {
  const favorites = useSelector(selectFavoriteMovie);

  return (
    <div className="ml-[10rem]">
      <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
        FAVORITE MOVIES
      </h1>

      <div className="flex flex-wrap">
        {favorites.map((movie) => (
          <Movie key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;