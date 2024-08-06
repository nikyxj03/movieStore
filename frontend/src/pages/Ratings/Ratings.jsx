import { yellow } from "@mui/material/colors";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text, color }) => {
  const fullStars = Math.floor(value);
  const halfStars = value - fullStars > 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} style={{ color }} className="ml-1" />
      ))}

      {halfStars === 1 && <FaStarHalfAlt style={{ color }} className="ml-1" />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} style={{ color }} className="ml-1" />
      ))}

      <span className="rating-text ml-2" style={{ color }}>
        {text && text}
      </span>
    </div>
  );
};

Ratings.defaultProps = {
  color: yellow[500],
};

export default Ratings;
