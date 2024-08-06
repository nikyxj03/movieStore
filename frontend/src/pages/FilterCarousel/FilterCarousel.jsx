

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './FilterCarousel.css'
import { Link } from "react-router-dom";


const FilterCarousel = ({movies}) => {
   
    
    const settings = {
        dots: false,
        // infinite: true,
        prevArrow : null,
        slidesToShow: 5,
        slidesToScroll : 1,
        arrows: true,
        initialSlide: -1
        // autoplay: true,
        // autoplaySpeed: 3000,
    }

    return (

        <div className="filter-carousel-container">
            <Slider 
            {...settings}
            className="filter-carousel-slider"
            >
                {
                    movies.map(({
                            image,
                            _id,
                            title,
                            }) => (
                                <>
                            <div key={_id} className='card'>               
                        <Link to={`/movie/${_id}`}>
                        <img
                        src={image}
                        alt={title}
                        className="filter-image"
                        />
                        </Link>
                        </div>
                        <div className="filter-info">
                            <h2>{title}</h2>
                        </div>
                        </>
                    
                      
               
             
            )
        )
    }
 </Slider>
</div>
    )
}

export default FilterCarousel