import express from "express";
import { createMovie, deleteMovieById, addMovieReview, getAllMovies, getMovieById, updateMovieById, fetchNewMovies, fetchTopMovies } from "../controllers/movieController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import checkId from '../middleware/checkId.js'

const router = express.Router()

router.route('/').post(authenticate, authorizeAdmin, createMovie).get(getAllMovies)

router.route("/:id/reviews").post(authenticate, checkId, addMovieReview);


router.get("/top", fetchTopMovies);
router.get("/new", fetchNewMovies);

router.route('/:id')
.delete(authenticate, authorizeAdmin, deleteMovieById)
.put(authenticate,authorizeAdmin,updateMovieById)
.get(getMovieById)






export default router;