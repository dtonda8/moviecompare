import React from 'react';
import { Link } from "react-router-dom";
import './MovieThumbnails.css';

const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/original';

const MovieThumbnails = (props) => {
    const getAddWatchlistMsg = (id) => {
        return props.watchlist.includes(id)
            ? 'Remove from Watchlist' 
            : 'Add to Watchlist'
    }

    return (props.results.map((result, index) => {
        const { poster_path, title, id, release_date } = result;
        if (poster_path && title && release_date) {
            return (
                <div
                    key={index}
                    className='thumbnail'>
                    <img 
                        className='movie-img'
                        src={BASE_POSTER_URL + poster_path}    
                        alt={'Movie poster'}>
                    </img>
                        <button 
                            className='add-to-watchlist'
                            id = {'add-' + id}
                            onClick={() => props.onClickAddMovie(id)}>
                            {getAddWatchlistMsg(id)}
                                
                        </button>
                        <Link to={'/' + id}>
                            <button className='details'>
                                Details
                            </button>
                        </Link>
                </div>
            );
        }
    }))
}


export default MovieThumbnails;