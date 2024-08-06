import { MOVIES_URL, UPLOAD_URL } from "../constants";

import { apiSlice } from "./apiSlice";

export const movieApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        allMovies: builder.query({
            query: () => `${MOVIES_URL}`,
        }),

        createMovie : builder.mutation({
            query: (movieData) => ({
                url: `${MOVIES_URL}`,
                method: "POST",
                body: movieData,
            }),
            invalidatesTags: ["Movie"]
        }),

        updateMovie: builder.mutation({
            query: ({movieId, movieData}) => ({
                url: `${MOVIES_URL}/${movieId}`,
                method: "PUT",
                body:movieData,
            })
        }),

        deleteMovie: builder.mutation({
            query: (movieId) => ({
                url: `${MOVIES_URL}/${movieId}`,
                method: "DELETE",
              }),
              providesTags: ["Movie"]
        }),

        getMovieById : builder.mutation({
            query: (movieId) => `${MOVIES_URL}/${movieId}`,
            providesTags: (result, error, movieId) => [
                {   type: "Movie", id: movieId},
            ]
        }),

        uploadProductImage : builder.mutation({
            query: (data) => ({
                url : `${UPLOAD_URL}`,
                method: 'POST',
                body:data,
            })
        }),

        getTopMovies: builder.query({
            query: () => `${MOVIES_URL}/top`,
            keepUnusedDataFor: 5,
          }),
      
        getNewMovies: builder.query({
            query: () => `${MOVIES_URL}/new`,
            keepUnusedDataFor: 5,
          }),

          getMovieDetails: builder.query({
            query: (movieId) => ({
              url: `${MOVIES_URL}/${movieId}`,
            }),
            keepUnusedDataFor: 5,
          }),
      
          createReview: builder.mutation({
            query: (data) => ({
              url: `${MOVIES_URL}/${data.movieId}/reviews`,
              method: "POST",
              body: data,
            }),
          }),
      



        


    })

})


export const{
    useCreateMovieMutation,
    useAllMoviesQuery,
    useDeleteMovieMutation,
    useUpdateMovieMutation,
    useGetMovieByIdMutation,
    useUploadProductImageMutation,
    useGetNewMoviesQuery,
    useGetTopMoviesQuery,
    useGetMovieDetailsQuery,
    useCreateReviewMutation
} = movieApiSlice