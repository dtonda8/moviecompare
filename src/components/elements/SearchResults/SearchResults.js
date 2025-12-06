import React, { useState, useEffect } from "react";
import MovieThumbnail from "../MovieThumbnail/MovieThumbnail";
import './SearchResults.css'
import { searchMovies } from '../../../utils/api';

const SearchResults = ({ input, onClickAddMovie, watchlist }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        searchMovies(input)
            .then(resJSON => setData(resJSON))
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
    }, [input])
    
    if (data) {
        let { results } = data
        return (
            <div className="results-div">
                {results.map((result, index) => {
                        const { poster_path, title, id, release_date } = result;
                        return (
                                <MovieThumbnail 
                                    key={index}
                                    poster_path={poster_path}
                                    title={title}
                                    id={id}
                                    release_date={release_date}
                                    watchlist={watchlist}
                                    onClickAddMovie={(movieID) => onClickAddMovie(movieID)}/>
                                    )
                        })}
            </div>
        );
    } 
    return (
        <div className="results-div">
            <p>Loading...</p>
        </div>
    )
}


export default SearchResults;