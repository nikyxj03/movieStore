import { Link } from "react-router-dom";
import HeartIcon from "../HeartIcon";


const Movie = ({ movie }) => {
  return (
    <div className="w-[30rem] ml-[2rem] p-3 relative">
      <div className="relative">
        <img
          src={movie.image}
          alt={movie.name}
          className="w-[30rem] rounded"
        />
        <HeartIcon movie={movie} />
      </div>

      <div className="p-4">
        <Link to={`/movie/${movie._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-small">{movie.name}</div>
            <span className="bg-pink-100 text-pink-800 text-sm font-small mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              $ {movie.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Movie;