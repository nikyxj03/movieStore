import { MOVIES_URL } from "../constants";

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
        })


        


    })

})


export const{
    useCreateMovieMutation,
    useAllMoviesQuery,
    useDeleteMovieMutation,
    useUpdateMovieMutation,
    useGetMovieByIdMutation
} = movieApiSlice