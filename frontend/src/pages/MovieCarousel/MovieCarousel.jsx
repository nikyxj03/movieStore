import { useGetTopMoviesQuery } from "../../redux/api/movieApiSlice";
import Message from '../../components/Message'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './MovieCarousel.css'
import { Link } from "react-router-dom";
import HeartIcon from "../HeartIcon";

const MovieCarousel = () => {
    const {data:movies, isLoading, error} = useGetTopMoviesQuery();

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll : 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
    }

    return (
        <div className="movie-carousel-container">
        {isLoading ? null : error ? (
            <Message variant="danger">
                {error?.data?.message || error.error} 
            </Message>
        ) : (
            <Slider 
            {...settings}
            className="movie-carousel-slider"
            >
                {
                    movies.map(
                        ({
                            image,
                            _id,
                            title,
                            synopsis,
                            genre,
                            language,
                            actor,
                            actress,
                            director,
                            price,
                            category
                            
                        }) => (
                            <div key={_id}>
                
                <Link to={`/movie/${_id}`}>
                <img
                  src={image}
                  alt={name}
                  className="movie-image"
                />
                </Link>
                <div className="movie-details">
                  <div className="movie-info">
                    <h2>{title}</h2>
                   
                    
                   
                  </div>

                  

    
                    </div>
                  </div>
               
             
            )
        )
    }
            




            </Slider>
        )}
        
        </div>
    )
}

export default MovieCarousel