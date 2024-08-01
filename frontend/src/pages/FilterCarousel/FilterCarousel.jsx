

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './FilterCarousel.css'
import { Link } from "react-router-dom";
import HeartIcon from "../HeartIcon";

const FilterCarousel = ({movies}) => {
   

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
                            
                            
                        }) => (
                            <div key={_id}>
                
                <Link to={`/movie/${_id}`}>
                <img
                  src={image}
                  alt={title}
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
       
        
        </div>
    )
}

export default FilterCarousel