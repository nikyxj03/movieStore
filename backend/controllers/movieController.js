import Movie from "../model/movieModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const createMovie = asyncHandler(async(req, res) => {
    const{
        title, 
        image,
        synopsis, 
        genre, 
        language, 
        actor, 
        actress, 
        director, 
        price,
        category,
        
    } = req.body

    if(!title || !genre || !language || !actor || !actress || !director || !price || !category){
        throw new Error("Please fill the required fields")
    }

    const movieExists = await Movie.findOne({title})
    if(movieExists) res.status(400).send("Movie already exists");
    const newMovie = new Movie({
        title, 
        image,
        synopsis, 
        genre, 
        language, 
        actor, 
        actress, 
        director, 
        price,
        category})

    try{
        await newMovie.save()
        res.status(201).json({
            title: newMovie.title,
            synopsis: newMovie.synopsis, 
            genre : newMovie.genre, 
            language: newMovie.language, 
            actor: newMovie.actor, 
            actress: newMovie.actress, 
            director: newMovie.director, 
            price: newMovie.price,
            category: newMovie.category
        })
    } catch(error){
        res.status(400)
        throw new Error("Invalid movie data")
    }
    
    
})

const getAllMovies = asyncHandler(async(req, res) => {
    const movies = await Movie.find({})
    res.json(movies)
})

const deleteMovieById = asyncHandler(async(req, res) => {
    
    const movie = await Movie.findById(req.params.id)

    if(movie){
        await Movie.deleteOne({_id: movie._id})
        res.json({message : "Movie deleted"})
    } else{
        res.status(404)
        throw new Error('Movie not found')
    }
})

const updateMovieById = asyncHandler(async(req, res) => {
    const id = req.params.id.trim()
    const movie = await Movie.findById(id)
    console.log(movie);
    if(movie){
        movie.title = req.body.title || movie.title 
        movie.image = req.body.image || movie.image
        movie.synopsis = req.body.synopsis || movie.synopsis 
        movie.genre = req.body.genre || movie.genre 
        movie.language = req.body.language || movie.language 
        movie.actor = req.body.actor || movie.actor
        movie.actress = req.body.actress || movie.actress 
        movie.director = req.body.director || movie.director
        movie.price = req.body.price || movie.price
        movie.category = req.body.category || movie.category

        const updatedMovie = await movie.save()

        res.json({
            _id : updatedMovie.id,
            title : updatedMovie.title, 
            image : updatedMovie.image,
            synopsis: updatedMovie.synopsis, 
            genre : updatedMovie.genre, 
            language : updatedMovie.language, 
            actor : updatedMovie.actor, 
            actress : updatedMovie.actress, 
            director : updatedMovie.director, 
            price: updatedMovie.price,
            category: updatedMovie.category
        })
    }else{
        res.status(404)
        throw new Error("Movie not found")
    }

    

})

const getMovieById = asyncHandler(async(req, res) => {
    const movie = await Movie.findById(req.params.id)

    if(movie){
        res.json({
            movie
        })
    } else{
        res.status(404)
        throw new Error("Movie not found")
    }
})

const fetchNewMovies = asyncHandler(async (req, res) => {
    try {
      const movies = await Movie.find().sort({ _id: -1 }).limit(5);
      res.json(movies);
    } catch (error) {
      console.error(error);
      res.status(400).json(error.message);
    }
  });

  const fetchTopMovies = asyncHandler(async (req, res) => {
    try {
      const movies = await Movie.find({}).sort({ rating: -1 }).limit(10);
      res.json(movies);
    } catch (error) {
      console.error(error);
      res.status(400).json(error.message);
    }
  });

  const addMovieReview = asyncHandler(async (req, res) => {
    try {
      const { rating, comment } = req.body;
      const movie = await Movie.findById(req.params.id);
  
      if (movie) {
        const alreadyReviewed = movie.reviews.find(
          (r) => r.user.toString() === req.user._id.toString()
        );
  
        if (alreadyReviewed) {
          res.status(400);
          throw new Error("Movie already reviewed");
        }
  
        const review = {
          name: req.user.username,
          rating: Number(rating),
          comment,
          user: req.user._id,
        };
  
        movie.reviews.push(review);
  
        movie.numReviews = movie.reviews.length;
  
        movie.rating =
          movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
          movie.reviews.length;
  
        await movie.save();
        res.status(201).json({ message: "Review added" });
      } else {
        res.status(404);
        throw new Error("Movie not found");
      }
    } catch (error) {
      console.error(error);
      res.status(400).json(error.message);
    }
  });
  
  



export {
    createMovie,
    getAllMovies,
    deleteMovieById,
    updateMovieById,
    getMovieById,
    fetchNewMovies,
    fetchTopMovies,
    addMovieReview
    
}