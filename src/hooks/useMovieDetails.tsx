import { useEffect, useState } from 'react'
import movieDB from '../api/movieDB'
import { MovieFull } from '../interfaces/movieInterface'
import { CreditsResponse, Cast } from '../interfaces/creditInterface';

interface MovieDetail {
    isLoading: boolean;
    movieFull?: MovieFull;
    cast: Cast[];
}



export const useMovieDetails = (movieId:number) => {
 
    const [state, setState] = useState<MovieDetail>({
        isLoading: true,
        movieFull: undefined,
        cast: [],
    })

    const getMovieDetail = async () => {
        const movieDetailResponse = movieDB.get<MovieFull>(`/${movieId}`);
        const castPromise = movieDB.get<CreditsResponse>(`/${movieId}/credits`);
        
        const [movieDetailsResp, castResp] = await Promise.all([movieDetailResponse, castPromise]);
        setState({
            isLoading:false,
            movieFull:movieDetailsResp.data,
            cast: castResp.data.cast
        })
    }
  
    useEffect(() => {
      getMovieDetail()
    }, [])

    return {
        ...state
    }
}
