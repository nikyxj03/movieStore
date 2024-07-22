import express from "express";
import { createMovie, deleteMovieById, getAllMovies, getMovieById, updateMovieById } from "../controllers/movieController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";


const router = express.Router()

router.route('/').post(createMovie).get(getAllMovies)

router.route('/:id')
.delete(authenticate, authorizeAdmin, deleteMovieById)
.put(authenticate,authorizeAdmin,updateMovieById)
.get(getMovieById)

export default router;