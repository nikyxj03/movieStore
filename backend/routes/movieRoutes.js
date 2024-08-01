import express from "express";
import { createMovie, deleteMovieById, getAllMovies, getMovieById, updateMovieById, fetchNewMovies, fetchTopMovies } from "../controllers/movieController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";


const router = express.Router()

router.route('/').post(authenticate, authorizeAdmin, createMovie).get(getAllMovies)

router.get("/top", fetchTopMovies);
router.get("/new", fetchNewMovies);

router.route('/:id')
.delete(authenticate, authorizeAdmin, deleteMovieById)
.put(authenticate,authorizeAdmin,updateMovieById)
.get(getMovieById)






export default router;