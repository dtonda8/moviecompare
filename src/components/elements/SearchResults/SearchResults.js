import React, { useState, useEffect } from "react";
import MovieThumbnail from "../MovieThumbnail/MovieThumbnail";
import './SearchResults.css'

const API_KEY = 'redacted';

const SearchResults = ({ input, onClickAddMovie, watchlist }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (input.length < 3) {
            fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(resJSON => setData(resJSON))
        } else {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${input}`)
                .then(res => res.json())
                .then(resJSON => setData(resJSON))
        }
    })
    
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


export default SearchResults