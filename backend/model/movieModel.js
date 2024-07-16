import mongoose from "mongoose";
import User from "./userModel";

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    rating: {
        type: Number,
        required: true,
    },

    comment: {
        type: String,
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'
    }
}, {timestamps : true });

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    synopsis:{
        type: String,
        required: true,
    },

    genre: {
        type: String,
        required: true,
    },

    language: {
        type: String,
        required: true,
    },

    actor: {
        type: String,
        required: true,
    },

    actress: {
        type: String,
        required: true,
    },

    director:{
        type: String,
        required: true,
    },

    overallRating : {
        type: Number,
        required: true,
        default: 0,
    },

   
    reviews: {
        reviewSchema
    },

    price: {
        type: Number,
        required: true,
        default: 0,
    },

    numReviews: {
        type: Number,
        required: true,
        default: 0,
    }

}, {timestamps: true})

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;