import React, { useEffect, useState } from 'react'
import movieDB from '../api/movieDB'
import { Movie, MovieDBMoviesResponse } from '../interfaces/movieInterface';

interface moviesState {
    NowPlaying: Movie[]
    popular: Movie[]
    topRated: Movie[]
    upcoming: Movie[]
}

export const useMovies = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [moviesState, setMoviesState] = useState<moviesState>({
        NowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: [],
    })
    
    const getMovies = async () => {
        const NowPlayingPromise = movieDB.get<MovieDBMoviesResponse>('/now_playing')
        const popularPromise    = movieDB.get<MovieDBMoviesResponse>('/popular')
        const topRatedPromise   = movieDB.get<MovieDBMoviesResponse>('/top_rated')
        const upcomingPromise   = movieDB.get<MovieDBMoviesResponse>('/upcoming')
        
        const resps = await Promise.all([
            NowPlayingPromise,
            popularPromise,
            topRatedPromise,
            upcomingPromise,
        ]);
        setMoviesState({ 
            NowPlaying: resps[0].data.results,
            popular   : resps[1].data.results,
            topRated  : resps[2].data.results,
            upcoming  : resps[3].data.results
        })
        setIsLoading( false )
    }
    useEffect(() => {
        //Now playing
        getMovies()
      }, [])
      
    
    return {
        ...moviesState,
        isLoading
    }
}
