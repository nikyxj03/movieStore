import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from '../Ratings/Ratings.jsx'
import Loader from '../../components/Loader.jsx'
import './MovieTabs.css'

const MovieTabs = ({loadingMovieReview, userInfo, submitHandler,
    rating, setRating, comment, setComment, movie
}) => {
    const [activeTab, setActiveTab] = useState(1)

    

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber)
    }

    return(
        <div className="review-block"> 
        <section>
          <div
            className= "que"
            onClick={() => handleTabClick(1)}
          >
            Write Your Review
          </div>
          <div
            className="que"
            onClick={() => handleTabClick(2)}
          >
            All Reviews
          </div>
        </section>
  
        <section>
            {activeTab === 1 && (
              <div>
                  {userInfo ? (
                      <form onSubmit={submitHandler}>
                        <div  className="smallbox">
                            <label htmlFor="rating" className="que">Rating</label>
                            <select
                                id="rating"
                                required
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className="ans"
                                
                            >
                                <option value="">Select</option>
                                <option value="1">Inferior</option>
                                <option value="2">Decent</option>
                                <option value="3">Great</option>
                                <option value="4">Excellent</option>
                                <option value="5">Exceptional</option>
                            </select>

                        </div>

                        <div className="smallbox"> 
                        <label className="que" htmlFor="comment" >
                            Comment
                        </label>

                        <textarea
                            id="comment"
                            rows="3"
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="ans"
                        ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={loadingMovieReview}
                            
                            >
                            Submit
                        </button>

                    </form>
                ) : (
                    <p>Please <Link to='/login'> Sign in</Link>to write a review</p>
                )}
            </div>
          )}
        </section>

<section>
  {activeTab === 2 && (
    <>
      <div>{movie.reviews.length === 0 && <p>No Reviews</p>}</div>

      <div>
        {movie.reviews.map((review) => (
          <div
            key={review._id}
           
          >
            <div >
              <strong>{review.name}</strong>
              <p>
                {review.createdAt.substring(0, 10)}
              </p>
            </div>

            <p>{review.comment}</p>
            <Ratings value={review.rating} />
          </div>
        ))}
      </div>
    </>
  )}
</section>

</div>
    )
}

export default MovieTabs;